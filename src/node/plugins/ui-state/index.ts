/* eslint-disable no-underscore-dangle */
import { autowired, IPlugin, IServiceManager } from '@/core';
import BaseUIEvent from '@/isomorphic/base/ui-state';
import { IUIState, UIRecordState } from '@/isomorphic/services';
import IOptions from '@/isomorphic/services/options';
import ICodeGen from '@/node/services/code-gen';

/**
 * UI状态同步，可以在recorder页面和injected页面同步状态
 * 目前是通过window对象注入实现的比较丑陋 @todo 待优化
 */

export default class UIStatePlugin
  extends BaseUIEvent
  implements IPlugin, IUIState
{
  @autowired(IServiceManager)
  serviceMgr: IServiceManager;

  @autowired(ICodeGen)
  codeGen: ICodeGen;

  @autowired(IOptions)
  options: IOptions;

  async registerSrv() {
    this.serviceMgr.registerServiceBean(IUIState, this);
  }

  async afterInit() {
    // 初始化设置录制状态
    await this.setState(
      this.options.startRecordOnFirst
        ? UIRecordState.recording
        : UIRecordState.none,
    );
    // 暴露状态同步方法
    this.codeGen.afterBrowerLaunch.on(browser => {
      browser.exposeBinding('__getUIState', true, async () => {
        return this.state;
      });
    });

    this.codeGen.afterAppPageLaunch.on(appPage => {
      // 向recorder页面注册方法window.__setUIState
      // 如果recorder调用该方法则同步injected页面的该方法
      appPage.exposeBinding(
        '__setUIState',
        true,
        async (_, state: UIRecordState) => {
          await this.setState(state);

          // 获取注入页面
          const page = this.codeGen.getPage();
          if (!page) return false;

          // 调用injected页面的方法同步State
          return page.evaluate((_state: UIRecordState) => {
            return window.__setUIState(_state);
          }, state);
        },
      );
    });
  }
}
