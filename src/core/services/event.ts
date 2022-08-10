import { genInjectID } from '../ioc';

export type RegisterCallback<T> = (cb: (arg: T) => void) => void;

export interface IEvent<T> {
  on: RegisterCallback<T>;
  once: RegisterCallback<T>;
  off: RegisterCallback<T>;

  trigger: (arg: T) => void;
}

export interface IEventManager {
  start: IEvent<void>;
  stop: IEvent<void>;
  afterInit: IEvent<void>;
  dispose: IEvent<void>;
}

export const IEventManager = genInjectID<IEventManager>();

export default IEventManager;
