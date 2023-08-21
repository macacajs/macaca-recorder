/*global chrome*/

import ReactDOM from "react-dom/client"
import './content.less'
import {
  getElementSelector,
  getElementOffset,
  resetStyle,
  setStyle,
} from "./common/element-utils";
import constants from '@/common/js/constants';

const {
  CLICK,
  DBLCLICK,
  INPUT,
  KEYDOWN,
  SELECT_BACKGROUND_COLOR,
  DEVTOOLS_ACTION_TAG,
  KEYBOARD_ACTION,
  DATA_MACACA_RECORDER_SELECT,
  MACACA_RECORDER_ENABLED
} = constants;

// 点击事件状态
let clicked = false;
// 点击事件定时器
let clickTimer = null;
// input 事件定时器
let inputTimer = null;
// 上一个元素信息
let lastElement = null;
let lastElementBackgroundColor = null;
// 输入事件时间戳
let inputTimestamp = null;
// 鼠标移动事件监听开关
let mousemoveEnabled = true;
// 插件开关
let enabled = true;

/**
 * 悬浮框组件
 */
const Content = () => {
  return (
    <div className="macaca-recorder-content">
      <div className="macaca-recorder-content-entry">
      </div>
    </div>
  )
}

// 创建 id 为 CRX-content 的 div
const app = document.createElement('div');
app.id = 'macaca-recorder-container';
document.body.appendChild(app);
const crxContainer = ReactDOM.createRoot(document.getElementById(app.id));
crxContainer.render(<Content />);


// 向目标页面注入 js
try {
  let insertScript = document.createElement('script');
  insertScript.setAttribute('type', 'text/javascript');
  insertScript.src = window.chrome.runtime.getURL('insert.js')
  document.body.appendChild(insertScript);
} catch (error) {
  console.error(error);
}

const addClickEvent = (event, selectors) => {
  // 注册单击事件
  clicked = false;
  event.target.onclick = () => {
    if (!enabled) return;
    // 通知 service worker 点击
    if (!clicked) {
      clicked = true;
      chrome.runtime.sendMessage({
        action: CLICK,
        index: 0,
        ...selectors,
      });
    }
    // 重置输入事件和鼠标移动事件
    inputTimestamp = null;
    mousemoveEnabled = true;
    // 重置点击状态
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clicked = false;
    }, 100);
  };
}

const addDblClickEvent = (event, selectors) => {
  // 注册双击事件
  event.target.ondblclick = (event1) => {
    if (!enabled) return;
    if (event1.target === event.target) {
      // 重置输入事件和鼠标移动事件
      inputTimestamp = null;
      mousemoveEnabled = true;
      // 通知 service worker 双击
      chrome.runtime.sendMessage({
        action: DBLCLICK,
        index: 0,
        ...selectors,
      });
    }
  };
}

/**
 * 监听鼠标移动事件
 */
window.onmousemove = (event) => {
  // 监听开关开启状态
  chrome.storage.local.get([ MACACA_RECORDER_ENABLED ], (items) => {
    enabled = items[MACACA_RECORDER_ENABLED];
    if (!enabled) {
      if (lastElement) resetStyle(lastElement, lastElementBackgroundColor);
      const entry = document.querySelector('.macaca-recorder-content-entry');
      entry.style.display = 'none';
    }
  });
  if (!enabled) return;
  // 忽略悬浮框
  if (event.target.id.includes('macaca-recorder')) return;
  // 同一个元素只触发一次
  if (event.target === lastElement) return;
  // 清除上一个元素选中样式
  if (lastElement) resetStyle(lastElement, lastElementBackgroundColor);
  // 为当前元素设置选中样式
  lastElement = event.target;
  lastElementBackgroundColor = lastElement.style.backgroundColor;
  setStyle(lastElement, SELECT_BACKGROUND_COLOR);
  
  // 获取元素对应的选择器
  const selectors = getElementSelector(lastElement);
  if (!selectors.selectors.length) return;

  // 动态展示元素信息
  const rect = getElementOffset(lastElement);
  const entry = document.querySelector('.macaca-recorder-content-entry');
  if (entry) {
    let tooltipStr = '';
    for (const item of selectors.selectors) {
      tooltipStr += `<span id="macaca-recorder-tooltip" style="margin: 5px">[${item.index + 1}/${item.length}] ${item.xpath}</span><br>`;
    }
    entry.innerHTML = tooltipStr;
    const entryRect = entry.getBoundingClientRect()
    if (entryRect.width + rect.left > rect.pageWidth) {
      entry.style.left = `${rect.left + rect.width - entryRect.width}px`;
    } else {
      entry.style.left = `${rect.left}px`;
    }
    entry.style.display = 'block';
    entry.style.top = `${rect.top + rect.height + 5}px`;
  }

  // 监听点击事件
  addClickEvent(event, selectors);
  // 监听双击事件
  addDblClickEvent(event, selectors);
  // 监听移动事件
  if (!mousemoveEnabled) return;
  chrome.runtime.sendMessage(selectors);
}

/**
 * 监听输入事件
 */
document.addEventListener(INPUT, (event) => {
  if (!enabled) return;
  // 跳过点击按钮触发 input 操作
  if (clicked) return;
  mousemoveEnabled = true;
  // 输入事件添加定时器
  clearTimeout(inputTimer);
  inputTimer = setTimeout(() => {
    if (!inputTimestamp) inputTimestamp = new Date().getTime();
    const value = event.target.value || event.target.innerText;
    const tagName = event.target.tagName.toLowerCase();
    if (!value) return;

    const selectors = getElementSelector(event.target, { action: INPUT });
    chrome.runtime.sendMessage({
      action: INPUT,
      index: 0,
      value,
      tag: tagName,
      timestamp: inputTimestamp,
      ...selectors,
    });
  }, 200);
});

/**
 * 监听键盘事件
 */
document.addEventListener(KEYDOWN, (event) => {
  if (!enabled) return;
  if (event.code === 'Enter') {
    // 重置输入事件和鼠标移动事件
    inputTimestamp = null;
    mousemoveEnabled = true;
    chrome.runtime.sendMessage({
      action: KEYDOWN,
      code: event.code,
    });
  }
});

/**
 * 监听事件消息
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!enabled) return;
  // 重置输入事件和鼠标移动事件
  inputTimestamp = null;
  if (message.devtoolsAction === DEVTOOLS_ACTION_TAG.ELEMENT_SELECT) {
    // 鼠标选择控制台中的元素
    setTimeout(() => {
      mousemoveEnabled = true;
      const selectElement = document.querySelector(`[${DATA_MACACA_RECORDER_SELECT}]`);
      const selectors = getElementSelector(selectElement);
      chrome.runtime.sendMessage(selectors);
    }, 200)
  } else if (message.devtoolsAction === DEVTOOLS_ACTION_TAG.ELEMENT_ACTION) {
    // 鼠标点击 devtools 实时元素后面的操作按钮
    // 进过 content 主要是为了重置 mousemoveEnabled 状态，保障操作流畅性
    mousemoveEnabled = true;
    sendResponse(message);
  } else if (message.keyboardAction === KEYBOARD_ACTION.RESET_OPTION) {
    // 开关作用：当按下 option + Space 按钮， mousemoveEnabled 为 false 时，控制台不再更新鼠标实时移动对应的元素
    // 用于对当前元素做一些其他操作，比如 check、hover、copy 等操作
    // 其他操作均会重置 mousemoveEnabled 为 true
    mousemoveEnabled = !mousemoveEnabled;
  }
});

