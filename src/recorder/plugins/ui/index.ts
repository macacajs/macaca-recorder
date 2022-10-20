import { autowired, IPlugin, IServiceManager } from '@/core';
import IUIState from '@/isomorphic/services/ui-state';
import ICode from '@/recorder/services/code';
import { init } from './app';
import UIState from './ui-state';

export default class UIPlugin implements IPlugin {
  container: HTMLDivElement;

  @autowired(IServiceManager)
  serviceManager: IServiceManager;

  @autowired(ICode)
  code: ICode;

  @autowired(IUIState)
  state: IUIState;

  async registerSrv() {
    this.serviceManager.registerService(IUIState, UIState);
  }

  async init() {
    this.state.init();
    this.container = document.createElement('div');
    this.container.className = 'app-container';
    document.body.appendChild(this.container);
  }

  async afterInit() {
    init(this.container, {
      icode: this.code,
      uiState: this.state,
    });
  }
}
