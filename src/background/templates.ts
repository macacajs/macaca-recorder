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
  const macacaCommonParameter = [];
  if (key !== 'text') macacaCommonParameter.push('use: \'xpath\'');
  if (selectorIndex) macacaCommonParameter.push(`index: ${selectorIndex}`);
  const args = `${macacaCommonParameter.length ? `, { ${macacaCommonParameter.join(', ')} }` : ''}`;
  // macaca 模版
  let macacaTemplate = `'${key === 'text' ? selectorValue : xpath}'${args}`;
  // cypress 模版
  let cypressTemplate = `cy.xpath('${xpath}')${selectorIndex ? `.eq(${selectorIndex})` : ''}`;

  switch (action) {
    case COMMON_ACTIONS.CLICK:
      macacaTemplate = `await driver.clickOn(${macacaTemplate});`;
      cypressTemplate = `${cypressTemplate}.click();`;
      break;
    case COMMON_ACTIONS.DBLCLICK:
      macacaTemplate = `await driver.dblclick(${macacaTemplate});`;
      cypressTemplate = `${cypressTemplate}.dblclick();`;
      break;
    case COMMON_ACTIONS.INPUT:
      macacaTemplate = `await driver.input('${inputValue}');`;
      cypressTemplate = `${cypressTemplate}.clear().type('${inputValue}');`;
      break;
    case COMMON_ACTIONS.HOVER:
      macacaTemplate = `await driver.move(${macacaTemplate});`;
      cypressTemplate = `${cypressTemplate}.trigger('mouseover', { force: true });`;
      break;
    case COMMON_ACTIONS.CHECK:
      macacaTemplate = `await driver.check(${macacaTemplate});`;
      cypressTemplate = `${cypressTemplate}.should('exist');`;
      break;
    default:
      break;
  }
  return {
    macaca: macacaTemplate,
    cypress: cypressTemplate,
  };
};
