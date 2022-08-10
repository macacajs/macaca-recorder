import { autowired, IEventManager, IPlugin, IServiceManager } from '@/core';
import EventImpl from './event';

export default class EventPlugin implements IPlugin {
  @autowired(IServiceManager)
  srvManager: IServiceManager;

  async registerSrv() {
    this.srvManager.registerService(IEventManager, EventImpl);
  }
}
