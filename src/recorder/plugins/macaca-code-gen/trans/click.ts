import { Action } from '@/types/actions';
import MacacaTransContext from '.';

export default function clickTrans(
  action: Action,
  context: MacacaTransContext,
) {
  if (action.name === 'click') {
    context.actions.push(action);
    context.codeList.push(
      `  .elementByXPath(${JSON.stringify(action.selector)})`,
    );
    context.codeList.push(`  .click()`);
  }
}
