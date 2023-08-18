import { Action } from '@/types/actions';
import MacacaTransContext from '.';

export default function keysTrans(
  action: Action,
  context: MacacaTransContext,
): void {
  if (action.name === 'press') {
    // 处理编辑类按键，不添加代码
    if (['Shift', 'Backspace'].includes(action.key)) {
      const backspace = action.key === 'Backspace';
      const prevAction = context.actions[context.actions.length - 1];
      // 更新code
      if (backspace && prevAction.name === 'fill') {
        prevAction.text = prevAction.text.slice(0, prevAction.text.length - 1);
        context.codeList.pop();
        context.codeList.push(`  .sendKeys('${prevAction.text}')`);
      }
      return;
    }
    context.actions.push(action);
    context.codeList.push(`  .keys(${JSON.stringify(action.key)})`);
  }
}
