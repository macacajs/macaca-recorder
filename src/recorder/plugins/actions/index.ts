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
import actionTrans from './trans';

declare global {
  interface Window {
    addAction?(action: Action): void;
  }
}

export default class ActionsPlugin implements IPlugin, IAction {
  onActionChange: IEvent<void>;

  actions: Action[] = [];

  codeList: string[] = [];

  @autowired(IServiceManager)
  serviceManager: IServiceManager;

  @autowired(IEventManager)
  eventManager: IEventManager;

  async registerSrv() {
    this.serviceManager.registerServiceBean(IAction, this);
    window.addAction = this.addAction.bind(this);
  }

  async init() {
    this.codeList.push('const macacaHelper = new MacacaHelper()');
    this.onActionChange = this.eventManager.createIEvent();
  }

  getCode(): string {
    return this.codeList.join('\n');
  }

  getActions(): Action[] {
    return this.actions;
  }

  addAction(action: Action) {
    const prevAction = this.actions[this.actions.length - 1];
    if (
      prevAction &&
      prevAction.name === 'fill' &&
      action.name === 'fill' &&
      prevAction.selector === action.selector
    ) {
      this.actions.pop();
      this.codeList.pop();
      const newAction: Action = {
        name: 'fill',
        selector: action.selector,
        signals: action.signals,
        text: prevAction.text + action.text,
      };
      this.actions.push(newAction);
      this.codeList.push(actionTrans(newAction));
    } else {
      this.actions.push(action);
      this.codeList.push(actionTrans(action));
    }
    this.onActionChange?.trigger();
    document.querySelectorAll('textarea').forEach(txt => {
      // eslint-disable-next-line no-param-reassign
      txt.value = `${this.actions.length}`;
    });
  }
}
