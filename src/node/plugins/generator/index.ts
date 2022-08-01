import { autowired, IPlugin, IServiceManager, serviceManagerID } from '@/core';
import icodeGenID from '@/node/services/code-gen';
import CodeGen from './coder';

export default class GeneratorPlugin implements IPlugin {
  @autowired(serviceManagerID)
  serviceManager: IServiceManager;

  public registerSrv() {
    this.serviceManager.registerService(icodeGenID, CodeGen);
  }
}
