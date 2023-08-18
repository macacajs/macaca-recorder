import { ParsedSelector } from '../isomorphic/selectorParser';

export interface InjectedScript {
  _evaluator: any;
  generateSelector(targetElement: Element): string;
  parseSelector(selector: string): ParsedSelector;
  highlight(selector: ParsedSelector): void;
  querySelector(
    selector: ParsedSelector,
    root: Node,
    strict: boolean,
  ): Element | undefined;
  querySelectorAll(selector: ParsedSelector, root: Node): Element[];
  isVisible(element: Element): boolean;
  deepElementFromPoint(
    document: Document,
    x: number,
    y: number,
  ): Element | undefined;
}
