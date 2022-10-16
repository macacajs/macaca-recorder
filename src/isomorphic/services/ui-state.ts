import { genInjectID, IEvent } from '@/core';

// eslint-disable-next-line no-shadow
export const enum UIRecordState {
  none,
  recording,
  pause,
}

export interface IUIState {
  readonly state: UIRecordState;

  readonly stateChange: IEvent<void>;

  init(): Promise<void>;
  setState(state: UIRecordState): Promise<void>;
}

export const IUIState = genInjectID<IUIState>();

export default IUIState;
