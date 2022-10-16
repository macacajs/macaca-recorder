/* eslint-disable no-underscore-dangle */
import { autowired, IEvent, IEventManager } from '@/core';
import { IUIState, UIRecordState } from '../services';

export default class BaseUIEvent implements IUIState {
  private _state: UIRecordState;

  get state(): UIRecordState {
    return this._state;
  }

  stateChange: IEvent<void>;

  @autowired(IEventManager)
  evtManager: IEventManager;

  async init() {
    this.stateChange = this.evtManager.createIEvent();
  }

  async setState(state: UIRecordState): Promise<void> {
    this._state = state;
  }
}
