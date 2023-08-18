import { genInjectID } from '@/core';

export interface IHighlight {
  clearHighlight(): void;
  updateHighlight(elements: Element[], tips: string): void;
}

export const IHighlight = genInjectID<IHighlight>();

export default IHighlight;
