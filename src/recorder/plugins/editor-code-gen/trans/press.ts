import { Action } from '@/types/actions';
import EditorTransContext from '.';

export default function pressTrans(
  action: Action,
  context: EditorTransContext,
) {
  if (action.name === 'press') {
    context.actions.push(action);
    context.codeList.push(
      `await macacaHelper.press(${JSON.stringify(action.key)})`,
    );
  }
}
