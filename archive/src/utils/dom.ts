import { IDispose, toDispose } from '@/core/disposable';

export function addEventListener<K extends keyof DocumentEventMap>(
  document: Document,
  type: K,
  listener: (ev: DocumentEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): IDispose;
export function addEventListener<K extends keyof HTMLElementEventMap>(
  dom: HTMLElement,
  type: K,
  listener: (ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): IDispose;
export function addEventListener(
  dom: any,
  type: string,
  listener: (ev: any) => any,
  options?: boolean | AddEventListenerOptions,
) {
  dom.addEventListener(type, listener, options);
  return toDispose(() => {
    dom.removeEventListener(type, listener, options);
  });
}

export type UNKNOWN = null;
