import { CLAZZ, genInjectID } from '../ioc';

export interface IPlugin {
  registerSrv?: () => void;
  init?: () => Promise<void>;
  afterInit?: () => void;
  onUnregistter?: () => void;
  dispose?: () => Promise<void>;
}

export interface IPluginManager {
  registerPlugin(plugin: CLAZZ<IPlugin>): void;
  registerPlugins(plugins: CLAZZ<IPlugin>[]): void;
  hasRegisterPlugin(plugin: CLAZZ<IPlugin>): boolean;
  unregisterPlugin(plugin: CLAZZ<IPlugin>): void;
}

export const pluginManagerID = genInjectID<IPluginManager>();

export default pluginManagerID;
