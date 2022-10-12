import { Action } from '@/types/actions';
import EditorTransContext from '.';

export default function fillTrans(
  action: Action,
  context: EditorTransContext,
): void {
  if (action.name !== 'fill') return;

  let prevAction = context.actions[context.actions.length - 1];
  if (
    prevAction &&
    prevAction.name === 'press' &&
    action.name === 'fill' &&
    action.text === prevAction.key
  ) {
    context.actions.pop();
    context.codeList.pop();
    prevAction = context.actions[context.actions.length - 1];
  }

  if (
    prevAction &&
    prevAction.name === 'fill' &&
    action.name === 'fill' &&
    prevAction.selector === action.selector
  ) {
    context.actions.pop();
    context.codeList.pop();
    const newAction: Action = {
      name: 'fill',
      selector: action.selector,
      signals: action.signals,
      text: prevAction.text + action.text,
    };
    context.actions.push(newAction);
    context.codeList.push(
      `await macacaHelper.fill(${JSON.stringify(
        newAction.selector,
      )}, ${JSON.stringify(newAction.text)})`,
    );
  } else {
    context.actions.push(action);
    context.codeList.push(
      `await macacaHelper.fill(${JSON.stringify(
        action.selector,
      )}, ${JSON.stringify(action.text)})`,
    );
  }
}
