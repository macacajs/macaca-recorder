import {
  autowired,
  IEvent,
  IEventManager,
  IPlugin,
  IServiceManager,
} from '@/core';
import { IProxy } from '@/isomorphic/services';
import { ICode, IUIActions } from '@/recorder/services';
import IActions from '@/recorder/services/action';

/**
 * 由template实现ICode插件，将ICode插件一
 */
export default class TemplatePlugin implements IPlugin, ICode {
  onCodeChange: IEvent<void>;

  @autowired(IProxy)
  proxy: IProxy;

  @autowired(IEventManager)
  evtMgr: IEventManager;

  @autowired(IServiceManager)
  serviceManager: IServiceManager;

  @autowired(IUIActions)
  uiActions: IUIActions;

  @autowired(IActions)
  actions: IActions;

  private code = '';

  async registerSrv() {
    this.serviceManager.registerServiceBean(ICode, this);
  }

  async init() {
    this.onCodeChange = this.evtMgr.createIEvent();
  }

  async afterInit() {
    const recorderFuncStr = await this.proxy.inject.getInjected('recorder');
    try {
      // eslint-disable-next-line no-eval
      const fn = eval(`(function ${recorderFuncStr})`) as (
        ...args: unknown[]
      ) => Promise<void>;
      // 调用模版方法
      if (typeof fn === 'function') {
        await fn({
          actions: this.actions,
          uiActions: this.uiActions,
          proxy: this.proxy,
          setCode: this.setCode.bind(this),
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  setCode(code: string) {
    this.code = code;
    this.onCodeChange?.trigger();
  }

  getCode(): string {
    return this.code;
  }
}
