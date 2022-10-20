import { Action } from '@/types/actions';
import EditorTransContext from '.';

export default function clickTrans(
  action: Action,
  context: EditorTransContext,
) {
  if (action.name === 'custom' && action.data.type === 'preventClick') {
    context.actions.push(action);
  }
  if (action.name !== 'click') return;
  const prevAction = context.actions[context.actions.length - 1];

  if (
    prevAction &&
    prevAction.name === 'custom' &&
    prevAction.data.type === 'preventClick'
  ) {
    context.actions.pop();
    console.info(context.actions);
    return;
  }

  context.actions.push(action);
  context.codeList.push(
    `await macacaHelper.click(${JSON.stringify(action.selector)})`,
  );
}
