/* global chrome*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  getElementSelector,
  getElementOffset,
  resetStyle,
  setStyle,
  cleanCenter,
  renderTooltip,
} from './common/element-utils';
import {
  COMMON_ACTIONS,
  KEYBOARD_ACTIONS,
  MACACA_RECORDER,
  MACACA_RECORDER_CONTAINER,
  MACACA_RECORDER_ENABLED,
  MACACA_RECORDER_EVENT_ACTIONS
} from '@/constants';
import {
  getStorageLocal,
} from '@/common/storage';
import MacacaRecorderCenter from './components/MacacaRecorderCenter';

let selectors = [];

// 元素信息
let lastElement = null;
let lastElementBackgroundColor = null;

// 点击事件状态
let clicked = false;
let clickTimer = null;

// 点击事件
let inputTimer = null;
let inputActionId = null;

// 插件开关
let enabled = true;

// 鼠标移动监听开关
let mousemoveEnabled = true;

// 背景样式
const defaultBackgroundColor = 'rgba(204, 51, 51, 0.1)';

let onRef = React.createRef();
let parentRef = React.createRef();

/**
 * 监听悬浮面板的操作
 * @param {*} action 
 * @param {*} opts 
 */
const handleWidgetClick = (action, opts = {}) => {
  chrome.runtime.sendMessage({
    action,
    ...opts
  });
} 

/**
 * 重置输入事件和鼠标移动事件
 */
const resetInputAndMouseEvent = (action) => {
  if (action !== COMMON_ACTIONS.INPUT) inputActionId = null;
  mousemoveEnabled = true;
};

/**
 * 监听点击事件
 * @param {*} event
 * @param {*} selectors
 */
document.addEventListener(COMMON_ACTIONS.CLICK, (event) => {

  if (!enabled) return;

  if (event.target.id.includes(MACACA_RECORDER)) {
    event.stopPropagation();
    return;
  };
  clicked = true;

  // 重置点击状态
  clearTimeout(clickTimer);
  clickTimer = setTimeout(() => {
    resetInputAndMouseEvent();
    chrome.runtime.sendMessage({
      action: COMMON_ACTIONS.CLICK,
      index: 0,
      ...selectors,
    });
    clicked = false;
  }, 200);
})


/**
 * 监听双击事件
 * @param {*} event
 * @param {*} selectors
 */
document.addEventListener(COMMON_ACTIONS.DBLCLICK, (event) => {

  if (!enabled) return;

  if (event.target.id.includes(MACACA_RECORDER)) {
    event.stopPropagation();
    return;
  };

  clearTimeout(clickTimer);

  resetInputAndMouseEvent();

  chrome.runtime.sendMessage({
    action: COMMON_ACTIONS.DBLCLICK,
    index: 0,
    ...selectors,
  });
});

/**
 * 监听输入事件
 */
document.addEventListener(COMMON_ACTIONS.INPUT, event => {
  if (!enabled) return;
  // 忽略点击输入框时触发的 input 操作
  if (clicked) return;
  // 忽略插件本身
  if (event.target.id.includes(MACACA_RECORDER)) return;

  clearTimeout(inputTimer);
  inputTimer = setTimeout(() => {
    const value = event.target.value || event.target.innerText;
    if (!value) return;

    mousemoveEnabled = true;

    if (!inputActionId) inputActionId = new Date().getTime();
    const tagName = event.target.tagName.toLowerCase();
    const selectors = getElementSelector(event.target);
    chrome.runtime.sendMessage({
      action: COMMON_ACTIONS.INPUT,
      index: 0,
      value,
      tag: tagName,
      actionId: inputActionId,
      ...selectors,
    });
  }, 200);
});

/**
 * 监听键盘事件
 */
document.addEventListener(COMMON_ACTIONS.KEYDOWN, event => {
  if (!enabled) return;
  const code = event.code;
  if (code === KEYBOARD_ACTIONS.ENTER) {
    resetInputAndMouseEvent();
    chrome.runtime.sendMessage({
      action: COMMON_ACTIONS.KEYDOWN,
      code,
    });
  }
});

/**
 * 监听事件消息
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  // 整体开关
  if (message.eventAction === MACACA_RECORDER_EVENT_ACTIONS.UPDATE_MAIN_SWITCH) {
    enabled = message.enabled;

    resetInputAndMouseEvent()

    if (lastElement) resetStyle(lastElement, lastElementBackgroundColor);

    parentRef?.current?.updateEnabled(enabled);
  }
  if (!enabled) return;

  if (message.eventAction === MACACA_RECORDER_EVENT_ACTIONS.UPDATE_MOUSE_SWITCH) {
    mousemoveEnabled = !mousemoveEnabled;
  } else if (message.eventAction === MACACA_RECORDER_EVENT_ACTIONS.UPDATE_STEPS) {
    resetInputAndMouseEvent(message.action)
    onRef?.current?.updateSteps(message);
  } else if (message.eventAction === MACACA_RECORDER_EVENT_ACTIONS.COPY_CODE) {
    resetInputAndMouseEvent()
    onRef?.current?.copyCode();
  }
});

/**
 * 监听鼠标移动事件
 * @param event
 */
window.onmousemove = event => {

  if (!enabled) return;

  if (event.target.id.includes(MACACA_RECORDER)) return;

  if (event.target === lastElement) return;

  selectors = getElementSelector(event.target);
  if (!selectors.selectors.length) return;

  // 选择样式
  if (lastElement) resetStyle(lastElement, lastElementBackgroundColor);
  lastElement = event.target;
  lastElementBackgroundColor = lastElement.style.backgroundColor;
  setStyle(lastElement, defaultBackgroundColor);

  // 渲染 tooltip 组件
  const rect = getElementOffset(lastElement);
  renderTooltip(rect, selectors);

  if (!mousemoveEnabled) return;
  // 更新悬浮组件的 selectors 数据
  onRef?.current?.updateSelectors(selectors.selectors);
};


const main = async () => {

  enabled = await getStorageLocal(MACACA_RECORDER_ENABLED);

  const app = document.createElement('div');
  app.id = MACACA_RECORDER_CONTAINER;
  document.body.appendChild(app);
  const crxContainer = ReactDOM.createRoot(document.getElementById(app.id));
  crxContainer.render(<MacacaRecorderCenter handleWidgetClick={handleWidgetClick} onRef={onRef} enabled={enabled} ref={parentRef}/>);
}

main();

