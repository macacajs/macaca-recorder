import { COMMON_ACTIONS, ATTRIBUTE_NAMES_CONFIG } from '@/constants';

export default (opts:{
  action?: string,
  selectors?: object,
  index?: number,
  value?: string,
} = {}) => {
  const {
    action,
    selectors,
    index,
    value: inputValue,
  } = opts;

  const selector = selectors[index];
  const {
    xpath,
    index: selectorIndex,
    value: selectorValue,
    key,
  } = selector;

  // 参数拼接
  const macacaCommonParameter = [];
  if (selectorIndex) macacaCommonParameter.push(`index=${selectorIndex}`);
  const args = `${macacaCommonParameter.length ? `, ${macacaCommonParameter.join(', ')}` : ''}`;
  // macaca 模版
  let macacaTemplate;
  if (key === 'text') {
    macacaTemplate = `'${selectorValue}'${args}`;
  } else if (ATTRIBUTE_NAMES_CONFIG.includes(key)) {
    macacaTemplate = `'${key}=${selectorValue}'${args}`;
  } else {
    macacaTemplate = xpath
  }

  switch (action) {
    case COMMON_ACTIONS.CLICK:
      macacaTemplate = `driver.click(${macacaTemplate})`;
      break;
    case COMMON_ACTIONS.DBLCLICK:
      macacaTemplate = `driver.dblclick(${macacaTemplate})`;
      break;
    case COMMON_ACTIONS.INPUT:
      macacaTemplate = `driver.input('${inputValue}')`;
      break;
    case COMMON_ACTIONS.HOVER:
      macacaTemplate = `driver.hover(${macacaTemplate})`;
      break;
    case COMMON_ACTIONS.CHECK:
      macacaTemplate = `driver.check(${macacaTemplate})`;
      break;
    default:
      break;
  }
  return {
    macaca: macacaTemplate,
  };
};
