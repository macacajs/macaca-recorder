import { Action } from '@/types/actions';
import MacacaTransContext from '.';

export default function clickTrans(
  action: Action,
  context: MacacaTransContext,
) {
  // FIXME checkbox 点击触发了两次
  if (action.name === 'click') {
    context.actions.push(action);
    const opts = {
      contains: true,
      index: 0,
    };
    let { selector } = action;
    // playwright selector 做一次转换
    if (/text=\s*?/.test(selector)) {
      selector = selector.replace('text=', '');
      opts.contains = false;
    }
    if (/has-text\(\s*?/.test(selector)) {
      const matchRes = selector.match(/"[\s\u4e00-\u9fa5 ]*?"/);
      if (matchRes) {
        selector = matchRes[0].replace(/"/g, '');
        opts.contains = false;
      }
    }
    if (action.data) {
      opts.index = action.data;
    }
    context.codeList.push(
      `  .clickOn('${selector}', ${JSON.stringify(opts).replace(
        /"/g,
        '',
      )})`,
    );
  }
}
