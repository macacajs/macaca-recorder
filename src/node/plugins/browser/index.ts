import { autowired, IPlugin, IServiceManager, serviceManagerID } from '@/core';
import {
  IBrowser,
  IBrowserFactory,
  ibrowserFactoryID,
} from '@/node/services/browser';
import AppBrowser from './app-browser';

export default class BrowserPlugin implements IPlugin, IBrowserFactory {
  @autowired(serviceManagerID)
  serviceManager: IServiceManager;

  apps: AppBrowser[] = [];

  registerSrv() {
    this.serviceManager.registerServiceBean(ibrowserFactoryID, this);
  }

  // eslint-disable-next-line class-methods-use-this
  createAppBrowser(): IBrowser {
    const app = new AppBrowser();
    this.apps.push(app);
    return app;
  }

  async dispose() {
    await Promise.all(this.apps.map(app => app.dispose()));
  }
}
