import { Action } from '@/types/actions';
import EditorTransContext from '.';

export default function SelectionChangeTrans(
  action: Action,
  context: EditorTransContext,
) {
  if (action.name === 'custom' && action.data.type === 'selectionchange') {
    const { startSelector, startOffset, endSelector, endOffset } = action.data;
    context.actions.push(action);
    if (!endSelector) {
      context.codeList.push(
        `await macacaHelper.makeSelection(${JSON.stringify(
          startSelector,
        )}, ${startOffset})`,
      );
    } else {
      context.codeList.push(
        `await macacaHelper.makeSelection(${JSON.stringify(
          startSelector,
        )}, ${startOffset}, ${JSON.stringify(endSelector)}, ${endOffset})`,
      );
    }
  }
}
