import { autowired, IPlugin } from '@/core';
import { IRecorder, ISelector } from '@/injected/services';
import clickSlot from './slots/click';
import inputSlot from './slots/input';
import keydownSlot from './slots/keydown';
import selectionSlot from './slots/selectionSlot';

export default class EditorTestPlugin implements IPlugin {
  @autowired(ISelector)
  selector: ISelector;

  @autowired(IRecorder)
  recorder: IRecorder;

  async init() {
    /**
     * id > class > xpath
     */
    // [
    //   this.selector.defaultSlots.easySlot,
    //   this.selector.defaultSlots.testidSlot,
    // ]
    this.selector.registerSlot([
      this.selector.defaultSlots.idSlot,
      this.selector.defaultSlots.classSlot,
      this.selector.defaultSlots.xpathSlot,
    ]);

    this.recorder.registerSlot([
      inputSlot,
      keydownSlot,
      clickSlot,
      selectionSlot, // 选区拦截
    ]);
  }
}
