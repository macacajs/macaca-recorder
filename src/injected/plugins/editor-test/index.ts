import { autowired, IPlugin } from '@/core';
import { IRecorder, ISelector } from '@/injected/services';
import clickSlot from './slots/click';
import inputSlot from './slots/input';
import keydownSlot from './slots/keydown';

export default class EditorTestPlugin implements IPlugin {
  @autowired(ISelector)
  selector: ISelector;

  @autowired(IRecorder)
  recorder: IRecorder;

  async init() {
    this.selector.registerSlot([
      this.selector.defaultSlots.testidSlot,
      this.selector.defaultSlots.classSlot,
      this.selector.defaultSlots.idSlot,
      this.selector.defaultSlots.xpathSlot,
    ]);

    this.recorder.registerSlot([inputSlot, keydownSlot, clickSlot]);
  }
}
