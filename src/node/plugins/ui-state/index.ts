/* eslint-disable no-underscore-dangle */
import { autowired, IPlugin, IServiceManager } from '@/core';
import BaseUIEvent from '@/isomorphic/base/ui-state';
import { IUIState, UIRecordState } from '@/isomorphic/services';
import ICodeGen from '@/node/services/code-gen';

declare global {
  interface Window {
    __setUIState(state: UIRecordState): Promise<void>;
  }
}

export default class UIStatePlugin
  extends BaseUIEvent
  implements IPlugin, IUIState
{
  @autowired(IServiceManager)
  serviceMgr: IServiceManager;

  @autowired(ICodeGen)
  codeGen: ICodeGen;

  async registerSrv() {
    this.serviceMgr.registerServiceBean(IUIState, this);
  }

  async afterInit() {
    this.codeGen.afterAppPageLaunch.on(page => {
      // 向app页面注册方法
      page.exposeBinding('__setUIState', true, (_, state: UIRecordState) => {
        this.setState(state);
        // 调用监控页面传递state
        this.codeGen.getPage()?.evaluate(async (_state: UIRecordState) => {
          await window.__setUIState(_state);
        }, state);
      });
    });
  }
}
