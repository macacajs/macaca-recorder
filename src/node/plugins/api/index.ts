import { autowired, IPlugin, IServiceManager } from '@/core';
import IApi from '@/node/services/api';
import Api from './api';

export default class ApiPlugin implements IPlugin {
  @autowired(IServiceManager)
  srvManager: IServiceManager;

  async registerSrv() {
    this.srvManager.registerService(IApi, Api);
  }
}
