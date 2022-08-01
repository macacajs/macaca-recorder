import { autowired } from '../../../core/ioc';
import ieventID from '../../../core/services/event';
import { IPlugin } from '../../../core/services/plugin';
import serviceManagerID, { IServiceManager } from '../../../core/services/service';
import EventImpl from './event';

export default class EventPlugin implements IPlugin {
  @autowired(serviceManagerID)
  srvManager: IServiceManager;

  registerSrv() {
    this.srvManager.registerService(ieventID, EventImpl);
  }
}
