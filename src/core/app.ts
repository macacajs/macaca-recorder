import IOCContext, { autowired, CLAZZ, InjectIDType } from './ioc';
import pluginManagerID, { IPlugin, IPluginManager } from './services/plugin';
import serviceManagerID, { IServiceManager } from './services/service';
import ieventID, { IEventManager } from './services/event';
import { uniq } from '../utils/array';
import iappID from './services/app';

export default class App implements IPluginManager, IServiceManager {
  context: IOCContext = new IOCContext();

  plugins: CLAZZ<IPlugin>[] = [];

  pluginInstances: IPlugin[] = [];

  @autowired(ieventID)
  eventManager: IEventManager;

  /**
   * 创建应用
   * @param plugins 插件列表
   * @param id 对外报漏的服务id
   * @returns 对外接口
   */
  static async createApp<T>(
    plugins: CLAZZ<IPlugin>[],
    id: InjectIDType<T>,
  ): Promise<T> {
    const app = new App(uniq(plugins));
    await app.start();
    const api = app.getService(id);
    if (!api) {
      throw new Error('unregister api plugin');
    }
    return api;
  }

  // @internal
  // 禁止通过new App创建
  // 应该采用creatApp创建
  private constructor(plugins: CLAZZ<IPlugin>[]) {
    this.plugins = plugins;
  }

  private async start() {
    this.context.registerBean(iappID, this);
    this.context.registerBean(pluginManagerID, this);
    this.context.registerBean(serviceManagerID, this);

    this.pluginInstances = this.plugins.map(plugin => {
      return this.context.of(plugin);
    });

    // 注册服务
    await Promise.all(
      this.pluginInstances.map(plug => {
        return plug.registerSrv?.();
      }),
    );

    this.context.resolveDeps(this, App as unknown as CLAZZ<App>);
    if (this.eventManager) {
      this.eventManager.start.trigger();
    }
  }

  async init() {
    // 解析依赖并触发init事件
    await Promise.all(
      this.pluginInstances.map((plug, index) => {
        this.context.resolveDeps(plug, this.plugins[index]);
        return plug.init?.();
      }),
    );
    // 触发插件的afterInit事件
    this.pluginInstances.forEach(plug => {
      plug.afterInit?.();
    });
    if (this.eventManager) {
      this.eventManager.afterInit.trigger();
    }
  }

  async dispose() {
    if (this.eventManager) {
      this.eventManager.dispose.trigger();
    }
    // 解析依赖并触发dispose事件
    await Promise.all(
      this.pluginInstances.map(plug => {
        return plug.dispose?.();
      }),
    );
    this.context.dispose();
  }

  /**
   * 注册插件
   * @param plugin 插件
   */
  async registerPlugin(plugin: CLAZZ<IPlugin>): Promise<void> {
    // 防止重复注册
    if (this.hasRegisterPlugin(plugin)) return;
    try {
      this.plugins.push(plugin);
      const plug = this.context.of(plugin);
      this.pluginInstances.push(plug);
      await plug.registerSrv?.();
    } catch (e) {
      throw new Error(`register plugin ${plugin.name} error`);
    }
  }

  /**
   * 注册插件
   * @param plugins 插件列表
   */
  async registerPlugins(plugins: CLAZZ<IPlugin>[]): Promise<void> {
    await Promise.all(plugins.map(plugin => this.registerPlugin(plugin)));
  }

  /**
   * 判断是否注册某个插件
   * @param plugin 插件
   * @returns 是否注册
   */
  hasRegisterPlugin(plugin: CLAZZ<IPlugin>): boolean {
    return !!this.plugins.find(v => v === plugin);
  }

  unregisterPlugin(plugin: CLAZZ<IPlugin>): void {
    const index = this.plugins.indexOf(plugin);
    if (index >= 0) {
      this.pluginInstances[index].onUnregistter?.();
      this.pluginInstances.slice(index, 1);
      this.plugins.splice(index, 1);
    }
  }

  registerServiceBean<T>(id: InjectIDType<T>, srv: T): void {
    this.context.registerBean(id, srv);
  }

  registerService<T>(id: InjectIDType<T>, srv: CLAZZ<T>): void {
    this.context.registerBeanClazz(id, srv);
  }

  getService<T>(id: InjectIDType<T>): T | null {
    return this.context.getBean(id);
  }
}
