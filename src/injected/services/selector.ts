import { genInjectID } from '@/core';

export interface ISelector {
  generateSelector(
    node: Element,
    strict?: boolean,
  ): { selector: string; elements: Element[] };
}

export const ISelector = genInjectID<ISelector>();

export default ISelector;
