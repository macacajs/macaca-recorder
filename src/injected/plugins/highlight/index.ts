import { autowired, IPlugin, IServiceManager } from '@/core';
import Highlight from '@/injected/lib/highlight';
import IHighlight from '@/injected/services/highlight';

export default class HighlightPlugin implements IPlugin, IHighlight {
  @autowired(IServiceManager)
  serviceManager: IServiceManager;

  highlight: Highlight = new Highlight(true);

  async registerSrv() {
    this.serviceManager.registerServiceBean(IHighlight, this);
  }

  async init() {
    this.highlight.install();
  }

  async dispose() {
    this.highlight.uninstall();
  }

  clearHighlight(): void {
    this.highlight.clearHighlight();
  }

  updateHighlight(elements: Element[], tips: string): void {
    this.highlight.updateHighlight(elements, tips, false);
  }
}
