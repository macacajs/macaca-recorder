import { autowired, IPlugin, IServiceManager } from '@/core';
import { IBrowser, IBrowserFactory } from '@/node/services/browser';
import AppBrowser from './app-browser';

export default class BrowserPlugin implements IPlugin, IBrowserFactory {
  @autowired(IServiceManager)
  serviceManager: IServiceManager;

  apps: AppBrowser[] = [];

  async registerSrv() {
    this.serviceManager.registerServiceBean(IBrowserFactory, this);
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
