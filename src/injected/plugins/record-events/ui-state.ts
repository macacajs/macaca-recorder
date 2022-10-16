/* eslint-disable no-underscore-dangle */
import BaseUIEvent from '@/isomorphic/base/ui-state';
import { UIRecordState } from '@/isomorphic/services';

declare global {
  interface Window {
    __setUIState: (state: UIRecordState) => Promise<void>;
  }
}

export default class UIState extends BaseUIEvent {
  constructor() {
    super();
    window.__setUIState = this.setState.bind(this);
  }
}
