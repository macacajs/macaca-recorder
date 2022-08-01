/* eslint-disable class-methods-use-this */
import { expect } from 'chai';
import {
  App,
  autowired,
  genInjectID,
  IPlugin,
  IPluginManager,
  IServiceManager,
  pluginManagerID,
  serviceManagerID,
} from '@/core';
import ApiPlugin from '@/node/plugins/api';
import iapiID from '@/node/services/api';

describe('test app', () => {
  it('should api plugin register error throw', () => {
    expect(() => App.createApp([], iapiID)).to.throw('unregister api plugin');
  });

  it('create app should work', async () => {
    const app = App.createApp([ApiPlugin], iapiID);
    await app.init();

    expect(app).not.instanceOf(App);
    expect(app.eventManger).to.equals(null);
  });

  it('should plugin works', async done => {
    interface IService {
      show(): string;
    }

    const iserviceID = genInjectID<IService>();

    class TestPlugin implements IPlugin {
      @autowired(serviceManagerID)
      serviceManager: IServiceManager;

      registerSrv() {
        this.serviceManager.registerService(
          iserviceID,
          class implements IService {
            name = 'test';

            show(): string {
              return this.name;
            }
          },
        );
      }
    }

    class Test2Plugin implements IPlugin {
      @autowired(iserviceID)
      service: IService;

      async init() {
        expect(this.service).not.equal(null);
        expect(this.service.show()).to.equal('test');
        done();
      }
    }

    const app = App.createApp([ApiPlugin, TestPlugin, Test2Plugin], iapiID);
    await app.init();
  });

  it('should register plugin work', async done => {
    interface IService {
      show(): string;
    }

    const iserviceID = genInjectID<IService>();

    class TestPlugin implements IPlugin {
      @autowired(serviceManagerID)
      serviceManager: IServiceManager;

      registerSrv() {
        this.serviceManager.registerService(
          iserviceID,
          class implements IService {
            name = 'test';

            show(): string {
              return this.name;
            }
          },
        );
      }
    }

    class Test2Plugin implements IPlugin {
      @autowired(iserviceID)
      service: IService;

      async init() {
        expect(this.service).not.equal(null);
        expect(this.service.show()).to.equal('test');
        done();
      }
    }

    class BasePlugin implements IPlugin {
      @autowired(pluginManagerID)
      plugManager: IPluginManager;

      registerSrv() {
        this.plugManager.registerPlugins([ApiPlugin, Test2Plugin, TestPlugin]);
      }
    }

    const app = App.createApp([BasePlugin], iapiID);
    await app.init();
  });

  it('service should not equal between apps', async () => {
    interface IService {
      show(): string;
    }

    const iserviceID = genInjectID<IService>();

    class ServiceImpl implements IService {
      name = 'test';

      show(): string {
        return this.name;
      }
    }

    class TestPlugin implements IPlugin {
      @autowired(serviceManagerID)
      serviceManager: IServiceManager;

      registerSrv() {
        this.serviceManager.registerService(iserviceID, ServiceImpl);
      }
    }

    class BasePlugin implements IPlugin {
      @autowired(pluginManagerID)
      plugManager: IPluginManager;

      registerSrv() {
        this.plugManager.registerPlugins([ApiPlugin, TestPlugin]);
      }
    }

    const app1 = App.createApp([BasePlugin], iapiID);
    const app2 = App.createApp([BasePlugin], iapiID);
    await Promise.all([app1.init(), app2.init()]);

    expect(app1.getService(iserviceID)).not.equal(null);
    expect(app2.getService(iserviceID)).not.equal(null);
    expect(app1.getService(iserviceID)).not.equal(app2.getService(iserviceID));
  });

  it('should register service bean work', async () => {
    interface IService {
      show(): string;
    }

    const iserviceID = genInjectID<IService>();

    class TestPlugin implements IPlugin, IService {
      name = '123';

      @autowired(serviceManagerID)
      serviceManager: IServiceManager;

      registerSrv() {
        this.serviceManager.registerServiceBean(iserviceID, this);
      }

      show(): string {
        return this.name;
      }
    }

    class BasePlugin implements IPlugin {
      @autowired(pluginManagerID)
      plugManager: IPluginManager;

      registerSrv() {
        this.plugManager.registerPlugins([ApiPlugin, TestPlugin]);
      }
    }

    const app = App.createApp([BasePlugin], iapiID);
    await app.init();

    expect(app.getService(iserviceID)).to.instanceOf(TestPlugin);
    expect(app.getService(iserviceID)?.show()).to.equal('123');
  });
});
