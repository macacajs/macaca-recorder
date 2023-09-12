/* global chrome */

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  COMMON_ACTIONS,
  KEYBOARD_ACTIONS,
  MACACA_RECORDER,
  MACACA_RECORDER_CONTAINER,
  MACACA_RECORDER_ENABLED,
  MACACA_RECORDER_EVENT_ACTIONS,
  DATA_MACACA_RECORDER_SELECT_TAG,
} from '@/constants';
import {
  getStorageLocal,
} from '@/common/storage';
import {
  getElementSelector,
  getElementOffset,
  resetStyle,
  setStyle,
} from './common/element-utils';
import MacacaRecorderCenter from './components/MacacaRecorderCenter';

interface Selectors {
  selectors: any;
}

let selectors: Selectors;

// 元素信息
let lastElement: HTMLElement = null;
let lastElementBackgroundColor: string = null;

// 鼠标事件
let mouseTimer: any = null;

// 点击事件状态
let clicked = false;
let clickTimer: any = null;
let dbClickTimer: any = null;

// 点击事件
let inputTimer: any = null;
let inputActionId: number = null;

// 插件开关
let enabled = true;

// 鼠标移动监听开关
let mousemoveEnabled = true;

// 背景样式
const defaultBackgroundColor = 'rgba(204, 51, 51, 0.1)';

const onWidgetRef = React.createRef();
const onTooltipRef = React.createRef();
const parentRef = React.createRef();

/**
 * 监听悬浮面板的操作
 */
const handleWidgetClick = (action, opts = {}) => {
  chrome.runtime.sendMessage({
    action,
    ...opts,
  });
};

/**
 * 重置输入事件和鼠标移动事件
 */
const resetInputAndMouseEvent = (action = null) => {
  if (action !== COMMON_ACTIONS.INPUT) inputActionId = null;
  mousemoveEnabled = true;
};

/**
 * 监听输入事件
 */
document.addEventListener(COMMON_ACTIONS.INPUT, (event) => {
  if (!enabled) return;
  // 忽略点击输入框时触发的 input 操作
  if (clicked) return;
  // 忽略插件本身
  const target = event.target as any;
  if (target.id.includes(MACACA_RECORDER)) return;

  clearTimeout(inputTimer);
  inputTimer = setTimeout(() => {
    const value = target.value || target.innerText;
    if (!value) return;

    mousemoveEnabled = true;

    if (!inputActionId) inputActionId = new Date().getTime();
    const tagName = target.tagName.toLowerCase();
    const inputSelectors = getElementSelector(target);
    chrome.runtime.sendMessage({
      action: COMMON_ACTIONS.INPUT,
      index: 0,
      value,
      tag: tagName,
      actionId: inputActionId,
      ...inputSelectors,
    });
  }, 200);
});

/**
 * 监听键盘事件
 */
document.addEventListener(COMMON_ACTIONS.KEYDOWN, (event) => {
  if (!enabled) return;

  const { code } = (event as any);
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

    resetInputAndMouseEvent();

    if (lastElement) resetStyle(lastElement, lastElementBackgroundColor);

    (parentRef?.current as any).updateEnabled(enabled);
  }
  if (!enabled) return;

  if (message.eventAction === MACACA_RECORDER_EVENT_ACTIONS.UPDATE_MOUSE_SWITCH) {
    mousemoveEnabled = !mousemoveEnabled;
  } else if (message.eventAction === MACACA_RECORDER_EVENT_ACTIONS.UPDATE_STEPS) {
    resetInputAndMouseEvent(message.action);
    (onWidgetRef?.current as any).updateSteps(message);
  } else if (message.eventAction === MACACA_RECORDER_EVENT_ACTIONS.COPY_CODE) {
    resetInputAndMouseEvent();
    (onWidgetRef?.current as any).copyCode();
  } else if (message.eventAction === MACACA_RECORDER_EVENT_ACTIONS.UPDATE_SELECTORS) {
    resetInputAndMouseEvent();

    const selectElement = document.querySelector(`[${DATA_MACACA_RECORDER_SELECT_TAG}]`);
    selectors = getElementSelector(selectElement);
    if (!selectors.selectors.length) return;

    mousemoveEnabled = false;

    (onWidgetRef?.current as any).updateSelectors(selectors.selectors);
  }
});

/**
 * 监听单击事件
 */
const addClickEvent = (event) => {
  event.target.addEventListener(COMMON_ACTIONS.CLICK, (e) => {
    // 处理点击事件的代码
    if (!enabled) return;

    if ((e.target as any).id.includes(MACACA_RECORDER)) {
      e.stopPropagation();
      return;
    }
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
  });
};

/**
 * 监听双击事件
 */
const addDblClickEvent = (event) => {
  event.target.addEventListener(COMMON_ACTIONS.DBLCLICK, (e) => {
    if (!enabled) return;

    if ((e.target as any).id.includes(MACACA_RECORDER)) {
      e.stopPropagation();
      return;
    }

    // 重置点击状态
    clearTimeout(clickTimer);
    clearTimeout(dbClickTimer);
    dbClickTimer = setTimeout(() => {
      resetInputAndMouseEvent();
      chrome.runtime.sendMessage({
        action: COMMON_ACTIONS.DBLCLICK,
        index: 0,
        ...selectors,
      });
    }, 200);
  });
};

/**
 * 监听鼠标移动事件
 */
window.onmousemove = (event) => {
  if (!enabled) return;

  if (event.target.id.includes(MACACA_RECORDER)) return;

  if (event.target === lastElement) return;

  selectors = getElementSelector(event.target);
  if (!selectors.selectors.length) return;

  // 重置样式
  if (lastElement) resetStyle(lastElement, lastElementBackgroundColor);
  (onTooltipRef?.current as any).updateTooltip({}, {});

  clearTimeout(mouseTimer);
  mouseTimer = setTimeout(() => {
    lastElement = event.target;
    lastElementBackgroundColor = lastElement.style.backgroundColor;
    setStyle(lastElement, defaultBackgroundColor);

    addClickEvent(event);
    addDblClickEvent(event);
    // 更新 tooltip 的 selectors 数据
    const rect = getElementOffset(lastElement);
    (onTooltipRef?.current as any).updateTooltip(rect, selectors);

    if (!mousemoveEnabled) return;
    // 更新 wedget 的 selectors 数据
    (onWidgetRef?.current as any).updateSelectors(selectors.selectors);
  }, 25);
};

const main = async () => {
  enabled = await getStorageLocal(MACACA_RECORDER_ENABLED) as boolean;

  const app = document.createElement('div');
  app.id = MACACA_RECORDER_CONTAINER;
  document.body.appendChild(app);
  const crxContainer = ReactDOM.createRoot(document.getElementById(app.id));
  crxContainer.render(<MacacaRecorderCenter
    handleWidgetClick={handleWidgetClick}
    onWidgetRef={onWidgetRef}
    onTooltipRef={onTooltipRef}
    enabled={enabled}
    ref={parentRef}
  />);
};

main();
