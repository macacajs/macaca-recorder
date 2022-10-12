import { Action } from '@/types/actions';
import EditorTransContext from '.';

export default function clickTrans(
  action: Action,
  context: EditorTransContext,
) {
  if (action.name === 'click') {
    context.actions.push(action);
    context.codeList.push(
      `await macacaHelper.click(${JSON.stringify(action.selector)})`,
    );
  }
}
