/* eslint-disable no-underscore-dangle */
import { autowired, IPlugin, IServiceManager } from '@/core';
import { IProxy } from '../services';

declare global {
  interface Window {
    __proxyCall: (...args: unknown[]) => Promise<unknown>;
  }
}

/**
 * 给 injected 和 recorder用
 * 可以通过提供proxy调用node能力
 * -------------------------
 * 提供{@link IProxy.fs:IProxy}服务
 */
export default class ProxyPlugin implements IPlugin {
  @autowired(IServiceManager)
  srvManager: IServiceManager;

  @autowired(IProxy)
  proxy: IProxy;

  proxies: { [key: string]: unknown } = {};

  async registerSrv() {
    this.srvManager.registerServiceBean(
      IProxy,
      new Proxy(this, {
        get: (_, p: string) => {
          if (!this.proxies[p]) {
            this.proxies[p] = new Proxy({ name: p } as object, {
              get(target, prop: string) {
                if (!target[prop]) {
                  // eslint-disable-next-line no-param-reassign
                  target[prop] = (...args: unknown[]) => {
                    return window.__proxyCall(`${p}.${prop}`, args);
                  };
                }
                return target[prop];
              },
            });
          }
          return this.proxies[p];
        },
      }) as unknown,
    );
  }

  async afterInit() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.proxy = this.proxy;
  }
}
