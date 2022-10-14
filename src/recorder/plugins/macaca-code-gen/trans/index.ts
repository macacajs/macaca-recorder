import { Action } from '@/types/actions';
import clickTrans from './click';
import keysTrans from './keys';
import sendKeysTrans from './sendKeys';

export interface TransFunc {
  // eslint-disable-next-line no-use-before-define
  (action: Action, context: MacacaTransContext): void;
}

export default class MacacaTransContext {
  actions: Action[] = [];

  codeList: string[] = ['return driver'];

  trans: TransFunc[] = [clickTrans, keysTrans, sendKeysTrans];

  appendAction(action: Action) {
    for (let i = 0; i < this.trans.length; i += 1) {
      this.trans[i](action, this);
    }

    return this.codeList.join('\n');
  }
}
