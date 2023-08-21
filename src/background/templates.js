import constants from '@/common/js/constants';

const {
  CLICK,
  DBLCLICK,
  INPUT,
  HOVER,
  CHECK,
} = constants;

export const getTemplatesCode = (opts = {}) => { 

  const action = opts.action;
  const selector = opts.selectors[opts.index];
  const {
    xpath,
    index,
    value,
    key
  } = selector;

  // 默认模版
  const defaultCommonParameter = [];
  if (key !== 'text') defaultCommonParameter.push('use: \'xpath\'');
  if (index) defaultCommonParameter.push(`index: ${index}`);
  const args = `${defaultCommonParameter.length ? ', { ' + defaultCommonParameter.join(', ') + ' }' : ''}`;
  
  // macaca 模版
  let macacaTemplate = `'${key === 'text' ? value : xpath}'${args}`;
  // cypress 模版
  let cypressTemplate = `cy.xpath('${xpath}')${index ? '.eq(' + index + ')' : ''}`;
  
  switch (action) {
    case CLICK:
      macacaTemplate = `await driver.clickOn(${macacaTemplate});`;
      cypressTemplate = `${cypressTemplate}.click();`;
      break;
    case DBLCLICK:
      macacaTemplate = `await driver.dblclick(${macacaTemplate});`;
      cypressTemplate = `${cypressTemplate}.dblclick();`;
      break;
    case INPUT:
      const inputValue = opts?.value;
      macacaTemplate = `await driver.input('${inputValue}');`;
      cypressTemplate = `${cypressTemplate}.clear().type('${inputValue}');`;
      break;
    case HOVER:
      macacaTemplate = `await driver.move(${macacaTemplate});`;
      cypressTemplate = `${cypressTemplate}.trigger('mouseover', { force: true });`;
      break;
    case CHECK:
      macacaTemplate = `await driver.check(${macacaTemplate});`;
      cypressTemplate = `${cypressTemplate}.should('exist');`;
      break;
    default:
      break;
  }
  return {
    macaca: macacaTemplate,
    cypress: cypressTemplate,
  }
}