import { Action } from '@/types/actions';
import MacacaWDTransContext from '.';

function codeFormat(codes) {
  return `  ${codes.join('\n  ')}`;
}

export default function clickTrans(
  action: Action,
  context: MacacaWDTransContext,
) {
  if (action.name === 'click') {
    context.actions.push(action);
    let { selector } = action;
    if (selector.startsWith('class=')) {

    }    
    context.codeList.push(codeFormat([
      `.elementByCss('${selector}')`,
      '.click()'
    ]));
  }
}
