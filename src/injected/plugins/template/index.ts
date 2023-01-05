import { autowired, IPlugin } from '@/core';
import { IHighlight, IRecorder, ISelector } from '@/injected/services';
import { IProxy } from '@/isomorphic/services';

export default class TemplatePlugin implements IPlugin {
  @autowired(ISelector)
  selector: ISelector;

  @autowired(IRecorder)
  recorder: IRecorder;

  @autowired(IHighlight)
  hightlight: IHighlight;

  @autowired(IProxy)
  proxy: IProxy;

  async init() {
    const injectedFuncStr = await this.proxy.inject.getInjected('injected');
    try {
      // eslint-disable-next-line no-eval
      const fn = eval(`(function ${injectedFuncStr})`) as (
        ...args: unknown[]
      ) => Promise<void>;
      // 调用模版方法
      if (typeof fn === 'function') {
        await fn({
          selector: this.selector,
          recorder: this.recorder,
          highlight: this.hightlight,
          proxy: this.proxy,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
}
