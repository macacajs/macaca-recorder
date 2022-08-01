import iapiID from '../../services/api';
import Api from './api';
import {
  autowired,
  IPlugin,
  IServiceManager,
  serviceManagerID,
} from '../../../core';

export default class ApiPlugin implements IPlugin {
  @autowired(serviceManagerID)
  srvManager: IServiceManager;

  registerSrv() {
    this.srvManager.registerService(iapiID, Api);
  }
}
