/* global chrome*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  getElementSelector,
  getElementOffset,
  resetStyle,
  setStyle,
  cleanTooltip,
  renderTooltip,
} from './common/element-utils';
import {
  COMMON_ACTIONS,
  KEYBOARD_ACTIONS,
  MACACA_RECORDER_CONTAINER,
  MACACA_RECORDER_ENABLED,
  DATA_MACACA_RECORDER_SELECT,
  DEVTOOLS_ACTION,
} from '@/constants';
import {
  getStorageLocal,
} from '@/common/storage';
import Tooltip from './tooltip/tooltip';


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

const app = document.createElement('div');
app.id = MACACA_RECORDER_CONTAINER;
document.body.appendChild(app);
const crxContainer = ReactDOM.createRoot(document.getElementById(app.id));
/* eslint-disable */
crxContainer.render(<Tooltip />);
/* eslint-enable */

/**
 * 页面加载时获取开关状态
 */
const getEnabled = async () => {
  enabled = await getStorageLocal(MACACA_RECORDER_ENABLED);
  return enabled;
}
getEnabled();

/**
 * 重置输入事件和鼠标移动事件
 */
const resetInputAndMouseEvent = () => {
  inputActionId = null;
  mousemoveEnabled = true;
};

/**
 * 监听点击事件
 * @param {*} event
 * @param {*} selectors
 */
const addClickEvent = (event, selectors) => {
  clicked = false;
  event.target.onclick = () => {
    if (!enabled) return;
    if (!clicked) {
      clicked = true;
      chrome.runtime.sendMessage({
        action: COMMON_ACTIONS.CLICK,
        index: 0,
        ...selectors,
      });
    }
    // 重置点击状态
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      resetInputAndMouseEvent();
      clicked = false;
    }, 100);
  };
};

/**
 * 监听双击事件
 * @param {*} event
 * @param {*} selectors
 */
const addDblClickEvent = (event, selectors) => {
  event.target.ondblclick = event1 => {
    if (!enabled) return;

    resetInputAndMouseEvent();

    if (event1.target === event.target) {
      chrome.runtime.sendMessage({
        action: COMMON_ACTIONS.DBLCLICK,
        index: 0,
        ...selectors,
      });
    }
  };
};

/**
 * 监听输入事件
 */
document.addEventListener(COMMON_ACTIONS.INPUT, event => {
  if (!enabled) return;
  // 忽略点击输入框时触发的 input 操作
  if (clicked) return;

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
  if (message.popupAction === MACACA_RECORDER_ENABLED) {
    cleanTooltip(lastElement, lastElementBackgroundColor);
    enabled = message.enabled;
  }

  if (!enabled) return;

  if (message.devtoolsAction === DEVTOOLS_ACTION.ELEMENT_SELECT) {
    resetInputAndMouseEvent();
    // 鼠标选择控制台中的元素
    const selectElement = document.querySelector(`[${DATA_MACACA_RECORDER_SELECT}]`);
    const selectors = getElementSelector(selectElement);
    chrome.runtime.sendMessage({
      action: COMMON_ACTIONS.MOUSEMOVE,
      ...selectors
    });
  } else if (message.devtoolsAction === DEVTOOLS_ACTION.ELEMENT_ACTION) {
    resetInputAndMouseEvent();
    sendResponse(message);
  } else if (message.keyboardAction === KEYBOARD_ACTIONS.RESET) {
    mousemoveEnabled = !mousemoveEnabled;
  }
});

/**
 * 监听鼠标移动事件
 * @param event
 */
window.onmousemove = event => {

  if (!enabled) return;

  if (event.target.id.includes(MACACA_RECORDER_CONTAINER)) return;

  if (event.target === lastElement) return;

  const selectors = getElementSelector(event.target);
  if (!selectors.selectors.length) return;

  // 选择样式
  if (lastElement) resetStyle(lastElement, lastElementBackgroundColor);
  lastElement = event.target;
  lastElementBackgroundColor = lastElement.style.backgroundColor;
  setStyle(lastElement, defaultBackgroundColor);

  // 渲染 tooltip 组件
  const rect = getElementOffset(lastElement);
  renderTooltip(rect, selectors);

  // 监听点击事件
  addClickEvent(event, selectors);

  // 监听双击事件
  addDblClickEvent(event, selectors);

  if (!mousemoveEnabled) return;
  chrome.runtime.sendMessage({
    action: COMMON_ACTIONS.MOUSEMOVE,
    ...selectors
  });
};
