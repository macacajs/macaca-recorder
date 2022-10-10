import { autowired, IPlugin } from '@/core';
import { IHighlight, ISelector } from '@/injected/services';
import { Action } from '@/types/actions';
import { buttonForEvent, modifiersForEvent, positionForEvent } from './helper';

declare global {
  interface Window {
    __handle_action: (action: Action) => Promise<void>;
  }
}

function addEventListener<K extends keyof DocumentEventMap>(
  target: Document,
  eventName: K,
  listener: (event: DocumentEventMap[K]) => void,
  useCapture?: boolean,
): () => void {
  target.addEventListener(eventName, listener, useCapture);
  return () => {
    target.removeEventListener(eventName, listener, useCapture);
  };
}

function deepEventTarget(event: Event): HTMLElement {
  return event.composedPath()[0] as HTMLElement;
}

type HighlightModel = {
  selector: string;
  elements: Element[];
};

export default class RecordEventsPlugin implements IPlugin {
  listeners: (() => void)[];

  private hoveredModel: HighlightModel | null = null;

  private hoveredElement: any;

  @autowired(IHighlight)
  highlight: IHighlight;

  @autowired(ISelector)
  selector: ISelector;

  // eslint-disable-next-line class-methods-use-this
  dispatchAction(action: Action) {
    // eslint-disable-next-line no-underscore-dangle
    window.__handle_action(action);
  }

  async afterInit() {
    this.listeners = [
      addEventListener(
        document,
        'click',
        event => this.onClick(event as MouseEvent),
        true,
      ),
      addEventListener(
        document,
        'auxclick',
        event => this.onClick(event as MouseEvent),
        true,
      ),
      addEventListener(document, 'input', event => this.onInput(event), true),
      // addEventListener(
      //   document,
      //   'keydown',
      //   event => this._onKeyDown(event as KeyboardEvent),
      //   true,
      // ),
      // addEventListener(
      //   document,
      //   'keyup',
      //   event => this._onKeyUp(event as KeyboardEvent),
      //   true,
      // ),
      // addEventListener(
      //   document,
      //   'mousedown',
      //   event => this._onMouseDown(event as MouseEvent),
      //   true,
      // ),
      // addEventListener(
      //   document,
      //   'mouseup',
      //   event => this._onMouseUp(event as MouseEvent),
      //   true,
      // ),
      addEventListener(
        document,
        'mousemove',
        event => this.onMouseMove(event as MouseEvent),
        true,
      ),
      // addEventListener(
      //   document,
      //   'mouseleave',
      //   event => this._onMouseLeave(event as MouseEvent),
      //   true,
      // ),
      addEventListener(document, 'focus', () => this.onFocus('focus'), true),
      addEventListener(
        document,
        'selectionchange',
        () => this.onFocus('selection'),
        true,
      ),
      addEventListener(
        document,
        'scroll',
        () => {
          this.hoveredModel = null;
          this.highlight.clearHighlight();
          this.updateHighlight();
        },
        true,
      ),
    ];
  }

  onFocus(type: 'focus' | 'selection'): void {
    if (!document.activeElement) return;
    const target = document.activeElement;
    const { selector } = this.selector.generateSelector(target);
    console.info(type, selector, window.getSelection());
  }

  onInput(evt: Event): void {
    if (evt instanceof InputEvent) {
      const target = deepEventTarget(evt);
      const { selector } = this.selector.generateSelector(target);
      this.dispatchAction({
        name: 'fill',
        selector,
        signals: [],
        text: evt.data || '',
      });
    }
  }

  onClick(evt: MouseEvent): void {
    const target = deepEventTarget(evt);
    const { selector } = this.selector.generateSelector(target);

    this.dispatchAction({
      name: 'click',
      selector,
      position: positionForEvent(evt),
      signals: [],
      button: buttonForEvent(evt),
      modifiers: modifiersForEvent(evt),
      clickCount: evt.detail,
    });
  }

  onMouseMove(evt: MouseEvent): void {
    const target = deepEventTarget(evt);
    if (this.hoveredElement === target) return;
    this.hoveredElement = target;
    this.updateModelForHoveredElement();
  }

  private updateModelForHoveredElement() {
    if (!this.hoveredElement || !window.injected) {
      this.hoveredModel = null;
      this.updateHighlight();
      return;
    }
    const { hoveredElement } = this;
    const { selector, elements } =
      this.selector.generateSelector(hoveredElement);
    if (
      (this.hoveredModel && this.hoveredModel.selector === selector) ||
      this.hoveredElement !== hoveredElement
    )
      return;
    this.hoveredModel = selector ? { selector, elements } : null;
    this.updateHighlight();
  }

  private updateHighlight() {
    const elements = this.hoveredModel ? this.hoveredModel.elements : [];
    const selector = this.hoveredModel ? this.hoveredModel.selector : '';
    this.highlight.updateHighlight(elements, selector);
  }

  async dispose() {
    this.listeners.forEach(v => v());
    this.highlight.clearHighlight();
    this.hoveredModel = null;
    this.hoveredElement = null;
  }
}
