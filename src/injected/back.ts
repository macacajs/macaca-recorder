/* eslint-disable import/no-import-module-exports */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-use-before-define, no-underscore-dangle */
/**
 * 注入代码
 */

import Highlight from './lib/highlight';
import { generateSelector } from './lib/selectGenerator';
import { InjectedScript } from './lib/type';

type HighlightModel = {
  selector: string;
  elements: Element[];
};

declare global {
  interface Window {
    _pw_getdom_?: (doms: any[]) => Promise<void>;
    CODE_GENER?: boolean;
    injected?: InjectedScript;
    getWebServices(): string[];
    getCodeServices(): string[];
  }
}

function addEventListener(
  target: EventTarget,
  eventName: string,
  listener: EventListener,
  useCapture?: boolean,
): () => void {
  target.addEventListener(eventName, listener, useCapture);
  const remove = () => {
    target.removeEventListener(eventName, listener, useCapture);
  };
  return remove;
}

function removeEventListeners(listeners: (() => void)[]) {
  listeners.forEach(listen => listen());
  listeners.splice(0, listeners.length);
}

function deepEventTarget(event: Event): HTMLElement {
  window._pw_getdom_?.(event.composedPath());
  return event.composedPath()[0] as HTMLElement;
}

class ConsoleExtends {
  private highlight: Highlight;

  private hoveredModel: HighlightModel | null = null;

  private isRecording = true;

  private listeners: (() => void)[] = [];

  private hoveredElement: any;

  injected: InjectedScript;

  constructor(injected: InjectedScript) {
    if (window.CODE_GENER) return;
    if (window.injected) return;
    window.injected = injected;
    this.injected = injected;
    this.highlight = new Highlight(false);
    this.install();
  }

  install() {
    // Ensure we are attached to the current document, and we are on top (last element);
    if (this.highlight.isInstalled()) {
      return;
    }
    removeEventListeners(this.listeners);
    this.listeners = [
      // addEventListener(
      //   document,
      //   'click',
      //   event => this._onClick(event as MouseEvent),
      //   true,
      // ),
      // addEventListener(
      //   document,
      //   'auxclick',
      //   event => this._onClick(event as MouseEvent),
      //   true,
      // ),
      // addEventListener(document, 'input', event => this._onInput(event), true),
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
      // addEventListener(document, 'focus', () => this._onFocus(), true),
      addEventListener(
        document,
        'scroll',
        () => {
          this.hoveredModel = null;
          this.highlight.hideActionPoint();
          this.updateHighlight();
        },
        true,
      ),
    ];
    this.highlight.install();
  }

  onMouseMove(evt: MouseEvent): void {
    const target = deepEventTarget(evt);
    if (this.hoveredElement === target) return;
    this.hoveredElement = target;
    this.updateModelForHoveredElement();
  }

  private updateModelForHoveredElement() {
    if (!this.hoveredElement) {
      this.hoveredModel = null;
      this.updateHighlight();
      return;
    }
    const { hoveredElement } = this;
    const { selector, elements } = generateSelector(
      this.injected,
      hoveredElement,
      true,
    );
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
    this.highlight.updateHighlight(elements, selector, false);
  }
}

module.exports = ConsoleExtends;
