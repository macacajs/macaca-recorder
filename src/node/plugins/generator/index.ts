import { autowired, IPlugin, IServiceManager } from "@/core";
import { ICodeGen } from "@/node/services/code-gen";
import { IWebServiceManager } from "@/node/services/coder-web-service";
import CodeGen from "./coder";

export default class GeneratorPlugin implements IPlugin {
  @autowired(IServiceManager)
  serviceManager: IServiceManager;

  public async registerSrv() {
    this.serviceManager.registerService(ICodeGen, CodeGen);
    this.serviceManager.registerService(IWebServiceManager, CodeGen);
  }
}
