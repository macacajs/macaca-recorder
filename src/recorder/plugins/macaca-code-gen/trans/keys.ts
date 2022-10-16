import { Action } from '@/types/actions';
import MacacaTransContext from '.';

export default function keysTrans(
  action: Action,
  context: MacacaTransContext,
): void {
  if (action.name === 'press') {
    context.actions.push(action);
    context.codeList.push(
      `  .elementByXPath(${JSON.stringify(action.selector)})`,
    );
    context.codeList.push(`  .keys(${JSON.stringify(action.key)})`);
  }
}
