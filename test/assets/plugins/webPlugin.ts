import { autowired, IPlugin, IPluginManager } from '@/core';

declare global {
  interface Window {
    WEB_PLUGIN?: boolean;
  }
}

export default class WebPlugin implements IPlugin {
  @autowired(IPluginManager)
  pluginManager: IPluginManager;

  async init() {
    window.WEB_PLUGIN = !!this.pluginManager;
  }
}
