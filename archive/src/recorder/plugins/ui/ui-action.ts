import { autowired, IEvent, IEventManager } from '@/core';
import { IActions, IUIActions } from '@/recorder/services';

export default class UIActions implements IUIActions {
  @autowired(IEventManager)
  evtMgr: IEventManager;

  changeEvent: IEvent<void>;

  actions: IActions[] = [];

  get uiActions() {
    return this.actions;
  }

  async init() {
    this.changeEvent = this.evtMgr.createIEvent();
  }

  registerAction(name: string, action: () => Promise<void>): void {
    this.actions.push({ name, action });
    this.changeEvent?.trigger();
  }
}
