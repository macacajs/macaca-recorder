/* global chrome */

import {
  MACACA_RECORDER,
  COMMON_ACTIONS,
  DEVTOOLS_ACTION,
  DEVTOOLS_ACTIONS_STEPS,
  DEVTOOLS_REALTIME_TABLE,
  MACACA_RECORDER_TEMPLATE,
  DATA_MACACA_RECORDER_SELECT,
} from '@/constants';

let runtimeData = null;

/**
 * 创建侧边栏
 */
chrome.devtools.panels.elements.createSidebarPane(MACACA_RECORDER, (sidebar) => {
  sidebar.setPage('devtools.html');
  sidebar.setHeight('100%');
});

/**
 * 创建长链接
 */
const port = chrome.runtime.connect({ name: 'devtools' });

port.postMessage({
  devtoolsAction: 'default',
  tabId: chrome.devtools.inspectedWindow.tabId,
});

/**
 * 监听调试面板消息
 */
chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
  chrome.devtools.inspectedWindow.eval(`window.selectElement.removeAttribute("${DATA_MACACA_RECORDER_SELECT}")`);
  chrome.devtools.inspectedWindow.eval(
    `$0.setAttribute('${DATA_MACACA_RECORDER_SELECT}', true)
     window.selectElement=$0`,
    () => {
      port.postMessage({
        devtoolsAction: DEVTOOLS_ACTION.ELEMENT_SELECT,
        tabId: chrome.devtools.inspectedWindow.tabId,
      });
    },
  );
});

/**
 * 实时元素操作按钮
 */
document
  .getElementById(DEVTOOLS_REALTIME_TABLE)
  .addEventListener(COMMON_ACTIONS.CLICK, (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'BUTTON') return;
    port.postMessage({
      ...runtimeData,
      devtoolsAction: DEVTOOLS_ACTION.ELEMENT_ACTION,
      action: target.id,
      index: Number(target.getAttribute('data-index')),
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  });

/**
 * 复制代码
 */
document
  .getElementById(DEVTOOLS_ACTION.COPY_CODE)
  .addEventListener(COMMON_ACTIONS.CLICK, () => {
    const element = document.getElementById(DEVTOOLS_ACTIONS_STEPS);
    const value = element.innerText;
    const tempInput = document.createElement('textarea');
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand(COMMON_ACTIONS.COPY);
    document.body.removeChild(tempInput);
  });

/**
 * 清除代码
 */
document
  .getElementById(DEVTOOLS_ACTION.CLEAN_CODE)
  .addEventListener(COMMON_ACTIONS.CLICK, (event) => {
    const target = event.target as HTMLElement;
    port.postMessage({
      devtoolsAction: target.id,
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  });

/**
 * 切换模版
 */
document
  .getElementById(DEVTOOLS_ACTION.CHANGE_TEMPLATE)
  .addEventListener(COMMON_ACTIONS.CHANGE, (event) => {
    const target = event.target as HTMLSelectElement;
    const template = target.value;
    port.postMessage({
      devtoolsAction: DEVTOOLS_ACTION.CHANGE_TEMPLATE,
      template,
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  });

/**
 * 监听 service worker 消息
 */
port.onMessage.addListener((message) => {
  if (message.messageType === 'actions') {
    const element = document.getElementById(DEVTOOLS_ACTIONS_STEPS);

    const select = document.getElementById(DEVTOOLS_ACTION.CHANGE_TEMPLATE) as HTMLSelectElement;

    const template = message.template || MACACA_RECORDER_TEMPLATE.DEFAULT;

    if (select.value !== template) select.value = template;

    if (!message.steps[template]) return;

    // 追加数据
    const steps = message.steps[template].join('<br>');
    element.innerHTML = `
    <span>
      ${steps}
    </span>`;
    element.scrollTop = element.scrollHeight;
  } else if (message.messageType === 'runtime') {
    const { selectors } = message;
    if (!selectors.length) return;

    const table = document.getElementById(DEVTOOLS_REALTIME_TABLE) as HTMLTableElement;
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    selectors.forEach((item, index) => {
      const selector = item;
      const row = table.insertRow();
      const selectorCell = row.insertCell(0);
      const actionsCell = row.insertCell(1);
      selectorCell.innerHTML = `[${selector.index + 1}/${selector.length}] ${selector.xpath}`;
      actionsCell.innerHTML = `
        <button id=${COMMON_ACTIONS.CLICK} data-index="${index}">点击</button>
        <button id=${COMMON_ACTIONS.DBLCLICK} data-index="${index}">双击</button>
        <button id=${COMMON_ACTIONS.HOVER} data-index="${index}">悬浮</button>
        <button id=${COMMON_ACTIONS.CHECK} data-index="${index}">检查</button>`;
    });
    runtimeData = message;
  }
});
