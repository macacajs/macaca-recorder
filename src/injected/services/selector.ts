import { genInjectID } from '@/core';

export type SelectorSlot = (
  node: Element,
) => null | { selector: string; elements: Element[]; data?: any };

export interface ISelector {
  defaultSlots: {
    readonly idSlot: SelectorSlot;
    readonly classSlot: SelectorSlot;
    readonly testidSlot: SelectorSlot;
    readonly xpathSlot: SelectorSlot;
  };

  generateSelector(
    node: Element,
    strict?: boolean,
  ): { selector: string; elements: Element[]; data?: any };

  registerSlot(slot: SelectorSlot | SelectorSlot[]): void;
}

export const ISelector = genInjectID<ISelector>();

export default ISelector;
