import { IEvent } from '@/core';

type Callback<T> = (arg: T) => void;

export default class EventBase<T> implements IEvent<T> {
  callbacks: Callback<T>[] = [];

  onceCallbacks: Callback<T>[] = [];

  on(cb: Callback<T>) {
    this.callbacks.push(cb);
  }

  once(cb: Callback<T>) {
    this.onceCallbacks.push(cb);
  }

  off(cb: Callback<T>) {
    this.callbacks = this.callbacks.filter(mcb => mcb !== cb);
    this.onceCallbacks = this.onceCallbacks.filter(mcb => mcb !== cb);
  }

  trigger(arg: T) {
    this.callbacks.forEach(cb => cb(arg));
    this.onceCallbacks.forEach(cb => cb(arg));
    this.onceCallbacks = [];
  }
}
