import {
  autowired,
  IEvent,
  IEventManager,
  IPlugin,
  IServiceManager,
} from '@/core';
import { IUIActions } from '@/recorder/services';
import IActions from '@/recorder/services/action';
import ICode from '@/recorder/services/code';
import { Action } from '@/types/actions';
import EditorTransContext from './trans';

export default class EditorCodeGen implements IPlugin, ICode {
  onCodeChange: IEvent<void>;

  code = '';

  @autowired(IActions)
  actions: IActions;

  @autowired(IEventManager)
  eventManager: IEventManager;

  @autowired(IServiceManager)
  serviceManager: IServiceManager;

  @autowired(IUIActions)
  uiActions: IUIActions;

  transContext = new EditorTransContext();

  async registerSrv() {
    this.serviceManager.registerServiceBean(ICode, this);
  }

  async init() {
    this.code = this.transContext.codeList.join('\n');
    this.onCodeChange = this.eventManager.createIEvent();

    this.uiActions.registerAction('清理', async () => {
      this.transContext = new EditorTransContext();
      this.code = this.transContext.codeList.join('\n');
      this.onCodeChange.trigger();
    });
  }

  async afterInit() {
    this.actions.onActionChange.on(this.handleAction);
  }

  getCode(): string {
    return this.code;
  }

  handleAction = (action: Action) => {
    try {
      const newCode = this.transContext.appendAction(action);
      if (this.code !== newCode) {
        this.code = newCode;
        this.onCodeChange.trigger();
      }
    } catch (e) {
      console.error(e);
    }
  };

  async dispose() {
    this.actions.onActionChange.off(this.handleAction);
  }
}
