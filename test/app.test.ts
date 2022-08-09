/* eslint-disable class-methods-use-this */
import { expect } from "chai";
import {
  App,
  autowired,
  genInjectID,
  IPlugin,
  IPluginManager,
  IServiceManager,
} from "@/core";
import ApiPlugin from "@/node/plugins/api";
import iapiID from "@/node/services/api";

describe("test app", () => {
  it("should api plugin register error throw", (done) => {
    App.createApp([], iapiID).catch((err) => {
      expect(() => {
        throw err;
      }).to.throw("unregister api plugin");
      done();
    });
  });

  it("create app should work", async () => {
    const app = await App.createApp([ApiPlugin], iapiID);
    await app.init();

    expect(app).not.instanceOf(App);
    expect(app.eventManger).to.equals(null);
  });

  it("should plugin works", async () => {
    interface IService {
      show(): string;
    }

    const IService = genInjectID<IService>();

    class TestPlugin implements IPlugin {
      @autowired(IServiceManager)
      serviceManager: IServiceManager;

      async registerSrv() {
        this.serviceManager.registerService(
          IService,
          class implements IService {
            name = "test";

            show(): string {
              return this.name;
            }
          }
        );
      }
    }

    let success = false;

    class Test2Plugin implements IPlugin {
      @autowired(IService)
      service: IService;

      async init() {
        expect(this.service).not.equal(null);
        expect(this.service.show()).to.equal("test");
        success = true;
      }
    }

    const app = await App.createApp(
      [ApiPlugin, TestPlugin, Test2Plugin],
      iapiID
    );
    await app.init();
    expect(success).to.equal(true);
  });

  it("should register plugin work", async () => {
    interface IService {
      show(): string;
    }

    const IService = genInjectID<IService>();

    class TestPlugin implements IPlugin {
      @autowired(IServiceManager)
      serviceManager: IServiceManager;

      async registerSrv() {
        this.serviceManager.registerService(
          IService,
          class implements IService {
            name = "test";

            show(): string {
              return this.name;
            }
          }
        );
      }
    }

    let success = false;

    class Test2Plugin implements IPlugin {
      @autowired(IService)
      service: IService;

      async init() {
        expect(this.service).not.equal(null);
        expect(this.service.show()).to.equal("test");
        success = true;
      }
    }

    class BasePlugin implements IPlugin {
      @autowired(IPluginManager)
      plugManager: IPluginManager;

      async registerSrv() {
        await this.plugManager.registerPlugins([
          ApiPlugin,
          Test2Plugin,
          TestPlugin,
        ]);
      }
    }

    const app = await App.createApp([BasePlugin], iapiID);
    await app.init();
    expect(success).to.equal(true);
  });

  it("service should not equal between apps", async () => {
    interface IService {
      show(): string;
    }

    const IService = genInjectID<IService>();

    class ServiceImpl implements IService {
      name = "test";

      show(): string {
        return this.name;
      }
    }

    class TestPlugin implements IPlugin {
      @autowired(IServiceManager)
      serviceManager: IServiceManager;

      async registerSrv() {
        this.serviceManager.registerService(IService, ServiceImpl);
      }
    }

    class BasePlugin implements IPlugin {
      @autowired(IPluginManager)
      plugManager: IPluginManager;

      async registerSrv() {
        this.plugManager.registerPlugins([ApiPlugin, TestPlugin]);
      }
    }

    const app1 = await App.createApp([BasePlugin], iapiID);
    const app2 = await App.createApp([BasePlugin], iapiID);
    await Promise.all([app1.init(), app2.init()]);

    expect(app1.getService(IService)).not.equal(null);
    expect(app2.getService(IService)).not.equal(null);
    expect(app1.getService(IService)).not.equal(app2.getService(IService));
  });

  it("should register service bean work", async () => {
    interface IService {
      show(): string;
    }

    const IService = genInjectID<IService>();

    class TestPlugin implements IPlugin, IService {
      name = "123";

      @autowired(IServiceManager)
      serviceManager: IServiceManager;

      async registerSrv() {
        this.serviceManager.registerServiceBean(IService, this);
      }

      show(): string {
        return this.name;
      }
    }

    class BasePlugin implements IPlugin {
      @autowired(IPluginManager)
      plugManager: IPluginManager;

      async registerSrv() {
        this.plugManager.registerPlugins([ApiPlugin, TestPlugin]);
      }
    }

    const app = await App.createApp([BasePlugin], iapiID);
    await app.init();

    expect(app.getService(IService)).to.instanceOf(TestPlugin);
    expect(app.getService(IService)?.show()).to.equal("123");
  });
});
