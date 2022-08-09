import {
  autowired,
  IApp,
  IEventManager,
  InjectIDType,
  IServiceManager,
} from "@/core";
import IApi from "@/node/services/api";
import ICodeGen from "@/node/services/code-gen";

export default class Api implements IApi {
  @autowired(IApp)
  app: IApp;

  @autowired(IEventManager)
  eventManger: IEventManager;

  @autowired(ICodeGen)
  codeGen: ICodeGen;

  @autowired(IServiceManager)
  serviceManager: IServiceManager;

  async init() {
    await this.app.init();
  }

  async dispose(): Promise<void> {
    await this.app.dispose();
  }

  getService<T extends object>(id: InjectIDType<T>): T | null {
    return this.serviceManager.getService(id);
  }
}
