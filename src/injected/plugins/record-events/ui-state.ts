/* eslint-disable no-underscore-dangle */
import BaseUIEvent from '@/isomorphic/base/ui-state';

/**
 * injected页面的UIState要同步app页面的数据
 * 所以要导出实现给window对象，在node层会调用该方法
 */

export default class UIState extends BaseUIEvent {
  constructor() {
    super();
    // 导出实现到window对象，交给node层进行调用
    window.__setUIState = this.setState.bind(this);
  }
}
