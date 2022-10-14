/* eslint-disable no-underscore-dangle */
import BaseUIEvent from '@/isomorphic/base/ui-state';
import { IUIState, UIRecordState } from '@/isomorphic/services/ui-state';

declare global {
  interface Window {
    __setUIState: (state: UIRecordState) => Promise<void>;
  }
}

export default class UIState extends BaseUIEvent implements IUIState {
  override async setState(state: UIRecordState) {
    super.setState(state);
    await window.__setUIState(state);
  }
}
