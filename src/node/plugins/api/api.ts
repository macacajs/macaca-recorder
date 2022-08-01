import {
  autowired,
  IApp,
  iappID,
  ieventID,
  IEventManager,
  InjectIDType,
  IServiceManager,
  serviceManagerID,
} from '@/core';
import { IApi } from '@/node/services/api';
import icodeGenID, { ICodeGen } from '@/node/services/code-gen';

export default class Api implements IApi {
  @autowired(iappID)
  app: IApp;

  @autowired(ieventID)
  eventManger: IEventManager;

  @autowired(icodeGenID)
  codeGen: ICodeGen;

  @autowired(serviceManagerID)
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
