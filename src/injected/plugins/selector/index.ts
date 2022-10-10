import { autowired, IPlugin, IServiceManager } from '@/core';
import { generateSelector } from '@/injected/lib/selectGenerator';
import { InjectedScript } from '@/injected/lib/type';
import { ISelector } from '@/injected/services';

function isOwnSelector(target: Element, selector: string) {
  const rets = target.ownerDocument.querySelectorAll(selector);
  return rets.length === 1 && rets[0] === target;
}

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
    const idSelector = `#${node.id}`;
    if (idSelector.length > 1 && isOwnSelector(node, idSelector)) {
      return {
        selector: idSelector,
        elements: [node],
      };
    }
    const selector = `${node.tagName.toLowerCase()}.${node.className
      .split(/\s+/g)
      .join('.')}`;
    if (isOwnSelector(node, selector)) {
      return {
        selector,
        elements: [node],
      };
    }
    return generateSelector(this.injected, node, strict);
  }
}
