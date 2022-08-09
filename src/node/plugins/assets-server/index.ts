import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { Socket } from "net";
import mime from "mime";
import { autowired, IPlugin, IServiceManager } from "@/core";
import { IAssetsServer } from "@/node/services/assets-server";

export default class AssetsServerPlugin implements IPlugin, IAssetsServer {
  @autowired(IServiceManager)
  manager: IServiceManager;

  server: http.Server;

  assetsDir: string;

  activeSockets: Socket[] = [];

  async registerSrv() {
    this.manager.registerServiceBean(IAssetsServer, this);
  }

  async start(host: string, port: number, assetsDir: string): Promise<void> {
    this.assetsDir = assetsDir;
    this.server = http.createServer(this.doServer);
    this.server.on("connection", (socket) => {
      this.activeSockets.push(socket);
      socket.once("close", () => {
        const index = this.activeSockets.indexOf(socket);
        if (index > -1) {
          this.activeSockets.splice(index, 1);
        }
      });
    });
    return new Promise((resolve, reject) => {
      this.server.once("error", reject);
      this.server.listen(port, host, () => {
        this.server.off("error", reject);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    if (!this.server || !this.server.listening) return;
    await new Promise((resolve, reject) => {
      this.activeSockets.forEach((sock) => sock.destroy());
      this.activeSockets.length = 0;
      this.server.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(null);
        }
      });
    });
  }

  doServer = (req: http.IncomingMessage, res: http.ServerResponse) => {
    const url = (req.url === "/" ? "/index.html" : req.url) || "/index.html";
    const filePath = path.resolve(this.assetsDir, url?.slice(1));
    if (!fs.existsSync(filePath)) {
      res.statusCode = 404;
      res.end("not found");
      return;
    }
    req.headers["content-type"] =
      mime.getType(path.extname(filePath)) || "application/octet-stream";
    fs.createReadStream(filePath)
      .pipe(res)
      .on("finish", () => res.end());
  };
}
