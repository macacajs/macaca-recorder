import { autowired, IPlugin, IServiceManager } from '@/core';
import { generateSelector } from '@/injected/lib/selectGenerator';
import { InjectedScript } from '@/injected/lib/type';
import { ISelector, SelectorSlot } from '@/injected/services';
import classSlot from './slots/class-slot';
import idSlot from './slots/id-slot';
import testidSlot from './slots/testid-slot';

function isOwnSelector(target: Element, selector: string) {
  const rets = target.ownerDocument.querySelectorAll(selector);
  return rets.length === 1 && rets[0] === target;
}

export default class SelectorPlugin implements IPlugin, ISelector {
  injected: InjectedScript;

  @autowired(IServiceManager)
  serviceManager: IServiceManager;

  defaultSlots = {
    idSlot,
    classSlot,
    testidSlot,
  } as const;

  // 扩展插槽
  slots: SelectorSlot[] = [];

  async registerSrv() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.injected = window.injected!;
    this.serviceManager.registerServiceBean(ISelector, this);
  }

  generateSelector(
    node: Element,
    strict = true,
  ): { selector: string; elements: Element[] } {
    for (let i = 0, l = this.slots.length; i < l; i += 1) {
      const slot = this.slots[i];
      const ret = slot(node);
      if (ret) return ret;
    }
    return generateSelector(this.injected, node, strict);
  }

  /**
   * 注册插槽
   * @param slot
   */
  registerSlot(slot: SelectorSlot | SelectorSlot[]): void {
    if (Array.isArray(slot)) {
      for (let i = 0, l = slot.length; i < l; i += 1) {
        this.slots.push(slot[i]);
      }
    } else {
      this.slots.push(slot);
    }
  }
}
