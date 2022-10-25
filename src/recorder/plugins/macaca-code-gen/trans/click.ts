import { Action } from '@/types/actions';
import MacacaTransContext from '.';

export default function clickTrans(
  action: Action,
  context: MacacaTransContext,
) {
  if (action.name === 'click') {
    context.actions.push(action);
    context.codeList.push(
      `  .clickOn(${JSON.stringify(
        action.selector,
      )}, { contains: ture, index: ${action.data || 0} })`,
    );
  }
}
