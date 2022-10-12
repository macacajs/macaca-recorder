import { Action } from '@/types/actions';
import clickTrans from './click';
import fillTrans from './fill';
import pressTrans from './press';

export interface TransFunc {
  // eslint-disable-next-line no-use-before-define
  (action: Action, context: EditorTransContext): void;
}

export default class EditorTransContext {
  actions: Action[] = [];

  codeList: string[] = ['const macacaHelper = new MacacaHelper()'];

  trans: TransFunc[] = [clickTrans, pressTrans, fillTrans];

  appendAction(action: Action) {
    for (let i = 0; i < this.trans.length; i += 1) {
      this.trans[i](action, this);
    }

    return this.codeList.join('\n');
  }
}
