import { Action } from '@/types/actions';
import MacacaWDTransContext from '.';

function codeFormat(codes) {
  return `  ${codes.join('\n  ')}`;
}

export default function sendKeysTrans(
  action: Action,
  context: MacacaWDTransContext,
): void {
  if (action.name !== 'fill') return;

  let prevAction = context.actions[context.actions.length - 1];
  if (prevAction && prevAction.name === 'press') {
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
    context.codeList.push(codeFormat([
      `.sendKeys('${newAction.text}')`,
    ]));
  } else {
    context.actions.push(action);
    context.codeList.push(codeFormat([
      `.sendKeys('${action.text})`,
    ]));
  }
}
