import { IEvent, IEventManager } from '@/core';
import EventBase from './event-base';

export default class EventImpl implements IEventManager {
  start: IEvent<void> = new EventBase<void>();

  stop: IEvent<void> = new EventBase<void>();

  afterInit: IEvent<void> = new EventBase<void>();

  dispose: IEvent<void> = new EventBase<void>();

  // eslint-disable-next-line class-methods-use-this
  createIEvent<T>(): IEvent<T> {
    return new EventBase<T>();
  }
}
