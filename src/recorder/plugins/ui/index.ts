import { autowired, IPlugin } from '@/core';
import IActions from '@/recorder/services/action';
import { init } from './app';

export default class UIPlugin implements IPlugin {
  container: HTMLDivElement;

  @autowired(IActions)
  actions: IActions;

  async init() {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
  }

  async afterInit() {
    init(this.container, this.actions);
  }
}
