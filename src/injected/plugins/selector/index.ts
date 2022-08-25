import { autowired, IPlugin, IServiceManager } from '@/core';
import { generateSelector } from '@/injected/lib/selectGenerator';
import { InjectedScript } from '@/injected/lib/type';
import { ISelector } from '@/injected/services';

export default class SelectorPlugin implements IPlugin, ISelector {
  injected: InjectedScript;

  @autowired(IServiceManager)
  serviceManager: IServiceManager;

  async registerSrv() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.injected = window.injected!;
    this.serviceManager.registerServiceBean(ISelector, this);
  }

  generateSelector(
    node: Element,
    strict = true,
  ): { selector: string; elements: Element[] } {
    return generateSelector(this.injected, node, strict);
  }
}
