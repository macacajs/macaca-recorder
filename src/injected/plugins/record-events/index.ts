import { autowired, IPlugin, IServiceManager } from '@/core';
import Disposable from '@/core/disposable';
import {
  IHighlight,
  IRecorder,
  IRecorderContext,
  ISelector,
  RecorderSlot,
} from '@/injected/services';
import { IUIState, UIRecordState } from '@/isomorphic/services';
import { Action } from '@/types/actions';
import { addEventListener } from '@/utils/dom';
import { buttonForEvent, modifiersForEvent, positionForEvent } from './helper';
import UIState from './ui-state';

declare global {
  interface Window {
    __handle_action: (action: Action) => Promise<void>;
  }
}

function deepEventTarget(event: Event): HTMLElement {
  return event.composedPath()[0] as HTMLElement;
}

type HighlightModel = {
  selector: string;
  elements: Element[];
};

export default class RecordEventsPlugin
  extends Disposable
  implements IPlugin, IRecorder
{
  private hoveredModel: HighlightModel | null = null;

  private hoveredElement: any;

  @autowired(IHighlight)
  highlight: IHighlight;

  @autowired(ISelector)
  selector: ISelector;

  @autowired(IServiceManager)
  serviceManager: IServiceManager;

  @autowired(IUIState)
  uiState: IUIState;

  slots: RecorderSlot[] = [];

  private oldAddEventListener: {
    <K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions | undefined,
    ): void;
    (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions | undefined,
    ): void;
  };

  // eslint-disable-next-line class-methods-use-this
  dispatchAction = (action: Action) => {
    // 判断状态是否 继续录制
    if (this.uiState.state !== UIRecordState.recording) return;
    // eslint-disable-next-line no-underscore-dangle
    window.__handle_action(action);
  };

  async registerSrv() {
    this.serviceManager.registerService(IUIState, UIState);
    this.serviceManager.registerServiceBean(IRecorder, this);
  }

  async init() {
    await this.uiState.init();
    // 对事件进行拦截
    this.oldAddEventListener = HTMLElement.prototype.addEventListener;
    const { oldAddEventListener, slots, selector, dispatchAction } = this;
    HTMLElement.prototype.addEventListener = function wrapAddEventListener(
      type: string,
      handler: (e: Event) => void,
      options?: boolean | AddEventListenerOptions | undefined,
    ) {
      const context: IRecorderContext = {
        dom: this,
        selector,
        modifiersForEvent,
        buttonForEvent,
        positionForEvent,
        addAction: dispatchAction,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      oldAddEventListener.call(
        this,
        type,
        (evt: any) => {
          for (let i = 0; i < slots.length; i += 1) {
            slots[i](type, evt, context);
          }
          handler.call(this, evt);
        },
        options,
      );
    };
  }

  async afterInit() {
    this.registerDispose(
      addEventListener(
        document,
        'mousemove',
        evt => this.onMouseMove(evt),
        true,
      ),
    );
    this.registerDispose(
      addEventListener(document, 'click', evt => this.onKeydown(evt), true),
    );
    this.registerDispose(
      addEventListener(document, 'keydown', evt => this.onKeydown(evt), true),
    );
    this.registerDispose(
      addEventListener(document, 'input', evt => this.onKeydown(evt), true),
    );
  }

  registerSlot(slot: RecorderSlot | RecorderSlot[]): void {
    if (Array.isArray(slot)) {
      for (let i = 0, l = slot.length; i < l; i += 1) {
        this.slots.push(slot[i]);
      }
    } else {
      this.slots.push(slot);
    }
  }

  onKeydown(evt: Event) {
    const context: IRecorderContext = {
      dom: deepEventTarget(evt),
      selector: this.selector,
      modifiersForEvent,
      buttonForEvent,
      positionForEvent,
      addAction: this.dispatchAction,
    };
    for (let i = 0; i < this.slots.length; i += 1) {
      this.slots[i](evt.type, evt, context);
    }
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
    super.dispose();
    HTMLElement.prototype.addEventListener = this.oldAddEventListener;
    this.highlight.clearHighlight();
    this.hoveredModel = null;
    this.hoveredElement = null;
  }
}
