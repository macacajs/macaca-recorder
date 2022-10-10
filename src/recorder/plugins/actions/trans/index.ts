import { Action } from '@/types/actions';

export default function actionTrans(action: Action) {
  switch (action.name) {
    case 'click': {
      return `await macacaHelper.click(${JSON.stringify(action.selector)})`;
    }
    case 'fill': {
      return `await macacaHelper.fill(${JSON.stringify(
        action.selector,
      )}, ${JSON.stringify(action.text)})`;
    }
    default:
      return '';
  }
}
