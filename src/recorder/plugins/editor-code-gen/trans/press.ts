/* eslint-disable no-bitwise */
import { Action } from '@/types/actions';
import EditorTransContext from '.';

export default function pressTrans(
  action: Action,
  context: EditorTransContext,
) {
  if (action.name !== 'press') return;
  if (['Meta', 'Control', 'Alt'].includes(action.key)) return;

  const keys = [action.key];
  if (action.modifiers & 4) {
    keys.unshift('Meta');
  }
  if (action.modifiers & 2) {
    keys.unshift('Control');
  }
  if (action.modifiers & 1) {
    keys.unshift('Alt');
  }

  context.actions.push(action);
  context.codeList.push(
    `await macacaHelper.press(${JSON.stringify(keys.join('+'))})`,
  );
}
