/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autowired,
  IEvent,
  IEventManager,
  IPlugin,
  IServiceManager,
} from '@/core';
import { IAction } from '@/recorder/services/api';
import { Action } from '@/types/actions';

declare global {
  interface Window {
    addAction?(action: Action): void;
  }
}

export default class ActionsPlugin implements IPlugin, IAction {
  onActionChange: IEvent<Action>;

  actions: Action[] = [];

  @autowired(IServiceManager)
  serviceManager: IServiceManager;

  @autowired(IEventManager)
  eventManager: IEventManager;

  async registerSrv() {
    this.serviceManager.registerServiceBean(IAction, this);
    window.addAction = this.addAction.bind(this);
  }

  async init() {
    this.onActionChange = this.eventManager.createIEvent();
  }

  getActions(): Action[] {
    return this.actions;
  }

  addAction(action: Action) {
    this.actions.push(action);
    this.onActionChange?.trigger(action);
  }
}
