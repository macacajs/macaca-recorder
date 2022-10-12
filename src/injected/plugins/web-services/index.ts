/* eslint-disable @typescript-eslint/no-explicit-any */
import { autowired, IPlugin, IPluginManager } from '@/core';
import * as core from '@/core';
import * as injectedServices from '@/injected/services';

declare global {
  interface Window {
    getWebServices(): Promise<string[]>;
    requireSource(path: string): Promise<string>;
    require(path: string): Promise<unknown>;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.require = (path: string) => {
  if (['@/core', 'macaca-recorder'].includes(path)) {
    return core as never;
  }
  if (
    ['@/injected/services', 'macaca-recorder/injected/services'].includes(path)
  ) {
    return injectedServices as never;
  }
  return window.requireSource(path).then(source => {
    // eslint-disable-next-line no-new-func
    const fn = new Function('module', 'exports', 'require', source);
    const module: any = { exports: {} };
    fn(module, module.exports, window.require);
    return module.exports?.default || module.exports;
  });
};

export default class WebServicesPlugin implements IPlugin {
  @autowired(IPluginManager)
  pluginManager: IPluginManager;

  async registerSrv() {
    const srvs = await window.getWebServices();
    const plugins = await Promise.all(srvs.map(window.require));
    plugins.forEach(plugin => {
      this.pluginManager.registerPlugin(plugin);
    });
  }
}
