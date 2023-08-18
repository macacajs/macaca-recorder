/* eslint-disable no-underscore-dangle */
import BaseUIEvent from '@/isomorphic/base/ui-state';
import { IUIState, UIRecordState } from '@/isomorphic/services/ui-state';

export default class UIState extends BaseUIEvent implements IUIState {
  override async setState(state: UIRecordState) {
    await super.setState(state);
    return window.__setUIState(state);
  }
}
