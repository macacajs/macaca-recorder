/* eslint-disable no-underscore-dangle */
import { autowired, IEvent, IEventManager } from '@/core';
import { IUIState, UIRecordState } from '../services';

/**
 * 基础UIEvent实现 由node recorder和injected页面都可以继承该实现
 */
export default class BaseUIEvent implements IUIState {
  private _state: UIRecordState;

  get state(): UIRecordState {
    return this._state;
  }

  stateChange: IEvent<void>;

  @autowired(IEventManager)
  evtManager: IEventManager;

  async init() {
    // 初始化时候获取node的状态初始值
    if (globalThis.__getUIState) {
      await window.__getUIState().then(state => {
        this._state = state;
      });
    }
    this.stateChange = this.evtManager.createIEvent();
  }

  async setState(state: UIRecordState): Promise<boolean> {
    this._state = state;
    return true;
  }
}
