import { genInjectID, IEvent } from '@/core';

// eslint-disable-next-line no-shadow
export const enum UIRecordState {
  none,
  recording,
  pause,
}

/**
 * node，injected 以及 recorder页面都提供该方法的设置
 * 在这里统一描述
 */
declare global {
  interface Window {
    __setUIState(state: UIRecordState): Promise<boolean>;
  }
}

/**
 * 状态同步服务
 */
export interface IUIState {
  readonly state: UIRecordState;

  readonly stateChange: IEvent<void>;

  init(): Promise<void>;
  setState(state: UIRecordState): Promise<boolean>;
}

export const IUIState = genInjectID<IUIState>();

export default IUIState;
