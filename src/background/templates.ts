import { COMMON_ACTIONS } from '@/constants';

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
  const defaultCommonParameter = [];
  if (key !== 'text') defaultCommonParameter.push('use: \'xpath\'');
  if (selectorIndex) defaultCommonParameter.push(`index: ${selectorIndex}`);
  const args = `${defaultCommonParameter.length ? `, { ${defaultCommonParameter.join(', ')} }` : ''}`;
  // default 模版
  let defaultTemplate = `'${key === 'text' ? selectorValue : xpath}'${args}`;
  // cypress 模版
  let cypressTemplate = `cy.xpath('${xpath}')${selectorIndex ? `.eq(${selectorIndex})` : ''}`;

  switch (action) {
    case COMMON_ACTIONS.CLICK:
      defaultTemplate = `await driver.clickOn(${defaultTemplate});`;
      cypressTemplate = `${cypressTemplate}.click();`;
      break;
    case COMMON_ACTIONS.DBLCLICK:
      defaultTemplate = `await driver.dblclick(${defaultTemplate});`;
      cypressTemplate = `${cypressTemplate}.dblclick();`;
      break;
    case COMMON_ACTIONS.INPUT:
      defaultTemplate = `await driver.input('${inputValue}');`;
      cypressTemplate = `${cypressTemplate}.clear().type('${inputValue}');`;
      break;
    case COMMON_ACTIONS.HOVER:
      defaultTemplate = `await driver.move(${defaultTemplate});`;
      cypressTemplate = `${cypressTemplate}.trigger('mouseover', { force: true });`;
      break;
    case COMMON_ACTIONS.CHECK:
      defaultTemplate = `await driver.check(${defaultTemplate});`;
      cypressTemplate = `${cypressTemplate}.should('exist');`;
      break;
    default:
      break;
  }
  return {
    default: defaultTemplate,
    cypress: cypressTemplate,
  };
};
