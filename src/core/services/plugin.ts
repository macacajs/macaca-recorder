import { CLAZZ, genInjectID } from "../ioc";

export interface IPlugin {
  registerSrv?: () => Promise<void>;
  init?: () => Promise<void>;
  afterInit?: () => void;
  onUnregistter?: () => void;
  dispose?: () => Promise<void>;
}

export interface IPluginManager {
  registerPlugin(plugin: CLAZZ<IPlugin>): Promise<void>;
  registerPlugins(plugins: CLAZZ<IPlugin>[]): Promise<void>;
  hasRegisterPlugin(plugin: CLAZZ<IPlugin>): boolean;
  unregisterPlugin(plugin: CLAZZ<IPlugin>): void;
}

export const IPluginManager = genInjectID<IPluginManager>();

export default IPluginManager;
