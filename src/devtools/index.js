/*global chrome*/
/*global port*/

import constants from '@/common/js/constants';

const {
  CLICK,
  DBLCLICK,
  COPY,
  HOVER,
  CHECK,
  CHANGE,
  DATA_MACACA_RECORDER_SELECT,
  DEVTOOLS_ACTION_TAG
} = constants;

let runtimeData = null;

/**
 * 创建侧边栏
 */
chrome.devtools.panels.elements.createSidebarPane('Macaca Recorder', (sidebar) => {
  // 加载页面
  sidebar.setPage('../../devtools.html');
  sidebar.setHeight('100%');
});


/**
 * 创建长链接
 */
const port = chrome.runtime.connect({ name: 'devtools' });
const postMessage = (opts = {}) => {
  console.log('devtools postMessage: ', port, opts);
  port.postMessage({
    ...opts,
    tabId: chrome.devtools.inspectedWindow.tabId,
  });
};

// 默认发送一条消息，将 port 保存
postMessage({
  devtoolsAction: 'macaca',
  tabId: chrome.devtools.inspectedWindow.tabId,
})

/**
 * 监听调试面板消息
 */
chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
  // 重置上一个元素属性
  chrome.devtools.inspectedWindow.eval(`window.selectElement.removeAttribute("${DATA_MACACA_RECORDER_SELECT}")`);
  chrome.devtools.inspectedWindow.eval(
    `$0.setAttribute('${DATA_MACACA_RECORDER_SELECT}', true)
     window.selectElement=$0`,
    postMessage({
      devtoolsAction: DEVTOOLS_ACTION_TAG.ELEMENT_SELECT,
    })
  );
});


/**
 * 实时元素操作按钮
 */
document.getElementById('devtools-realtime-table').addEventListener(CLICK, (event) => {
  if (event.target.tagName !== 'BUTTON') return;
  postMessage({
    devtoolsAction: DEVTOOLS_ACTION_TAG.ELEMENT_ACTION,
    action: event.target.id,
    tabId: chrome.devtools.inspectedWindow.tabId,
    index: Number(event.target.getAttribute('data-index')),
    ...runtimeData,
  });
});

/**
 * 复制代码
 */
document.getElementById(DEVTOOLS_ACTION_TAG.COPY_CODE).addEventListener(CLICK, () => {
  const element = document.getElementById('devtools-actions-steps');
  const value = element.innerText;
  const tempInput = document.createElement('textarea');
  tempInput.value = value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand(COPY);
  document.body.removeChild(tempInput);
});

/**
 * 清除代码
 */
document.getElementById(DEVTOOLS_ACTION_TAG.CLEAN_CODE).addEventListener(CLICK, (event) => {
  postMessage({
    devtoolsAction: event.target.id,
    tabId: chrome.devtools.inspectedWindow.tabId,
  });
});

/**
 * 切换模版
 */
document.getElementById(DEVTOOLS_ACTION_TAG.CHANGE_TEMPLATE).addEventListener(CHANGE, (event) => {
  const target = event.target;
  const value = target.value;
  postMessage({
    devtoolsAction: DEVTOOLS_ACTION_TAG.CHANGE_TEMPLATE,
    value,
    tabId: chrome.devtools.inspectedWindow.tabId,
  });
});

/**
 * 监听 service worker 消息
 */
port.onMessage.addListener((message) => {
  if (message.dataType === 'actions') {
    const template = message.template || 'macaca';
    const element = document.getElementById('devtools-actions-steps');
    // 设置 select 选中
    const select = document.getElementById(DEVTOOLS_ACTION_TAG.CHANGE_TEMPLATE);
    if (select.value !== template) {
      select.value = template;
    }
    // 追加数据
    if (!message.steps[template]) return;
    const steps = message.steps[template].join('<br>');
    element.innerHTML = `
    <span>
      ${steps}
    </span>`;
    element.scrollTop = element.scrollHeight;

  } else if (message.dataType === 'runtime') {
    const selectors = message.selectors;
    if (!selectors.length) return;
    // 渲染实时元素
    const table = document.getElementById("devtools-realtime-table");
    // 清除所有行
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
    for (const index in selectors) {
      const selector = selectors[index];
      const row = table.insertRow();
      const selectorCell = row.insertCell(0);
      const actionsCell = row.insertCell(1);
      selectorCell.innerHTML = `[${selector.index + 1}/${selector.length}] ${selector.xpath}`;
      actionsCell.innerHTML = `
        <button id=${CLICK} data-index="${index}">点击</button>
        <button id=${DBLCLICK} data-index="${index}">双击</button>
        <button id=${HOVER} data-index="${index}">悬浮</button>
        <button id=${CHECK} data-index="${index}">检查</button>`;
    }
    runtimeData = message;
  }
});
