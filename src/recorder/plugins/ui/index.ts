import { autowired, IPlugin } from '@/core';
import ICode from '@/recorder/services/code';
import { init } from './app';

export default class UIPlugin implements IPlugin {
  container: HTMLDivElement;

  @autowired(ICode)
  code: ICode;

  async init() {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
  }

  async afterInit() {
    init(this.container, this.code);
  }
}
