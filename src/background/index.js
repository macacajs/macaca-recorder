/*global chrome*/

import { getTemplatesCode } from './templates';
import constants from '@/common/js/constants';
const {
  INPUT,
  TEMPLATES,
  STORAGE_TEMPLATE,
  DEVTOOLS_ACTION_TAG,
  KEYBOARD_ACTION,
  MACACA_RECORDER_ENABLED
} = constants;
const ports = {};
const actions = {};

/**
 * 事件初始化时调用
 */
chrome.runtime.onInstalled.addListener(() => {
  console.log('plug-in has been initialized.');

  chrome.storage.local.get([ STORAGE_TEMPLATE ], (result) => {
    actions.template = result.template || 'macaca';
  });

  chrome.storage.local.set({ 'macaca-recorder-enabled': true }, () => {
  });

});

/**
 * 发送消息到 devtools
 * @param {*} tabId 
 * @param {*} opts 
 */
const sendMessageToDevtools = (tabId, opts = {}) => {
  if (!tabId) return;
  const port = ports[tabId];
  console.log('background sendMessageToDevtools:', tabId, port, ports)
  if (port) {
    port.onDisconnect.addListener(() => {
      port.connect = false;
    });
    if (port.connect) {
      port?.postMessage({
        ...opts,
      });
    }
  }
}

/**
 * 更新操作步骤
 * @param {*} tabId 
 * @param {*} opts 
 */
const updateCaseSteps = (tabId, opts = {}) => {
  const selectors = opts.selectors;
  if (!selectors?.length) return;
  // 新窗口
  if (!actions.hasOwnProperty(tabId)) {
    const steps = TEMPLATES.reduce((acc, curr) => {
      acc[curr] = [];
      return acc;
    }, {});
    actions[tabId] = {
      steps,
      data: [],
    };
  }

  const action = opts.action;
  const templatesCode = getTemplatesCode(opts);

  // input 防止重复写入
  if (action === INPUT) {
    const lastSteps = actions[tabId].data.slice(-1);
    if (lastSteps.length && lastSteps[0].timestamp === opts.timestamp) {
      actions[tabId].steps.default = actions[tabId].steps.default.slice(0, -1);
      actions[tabId].steps.cypress = actions[tabId].steps.cypress.slice(0, -1);
      actions[tabId].data = actions[tabId].data.slice(0, -1);
    }
  }

  // 写入步骤
  for (const templatesKey in templatesCode) {
    actions[tabId].steps[templatesKey].push(templatesCode[templatesKey]);
  }
  actions[tabId].data.push(opts);

  // 发送消息
  sendMessageToDevtools(tabId, { 
    dataType: 'actions',
    steps: actions[tabId].steps, 
    template: actions.template
  })
}


/**
 * 监听来自 content 的消息
 */
chrome.runtime.onMessage.addListener((message) => {
  if (!message) return;
  // 获取 tab
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const tab = tabs[0];
    const tabId = tab?.id;
    if (!tabId) return;
    if (message.action) {
      // 包含各种操作：click、dblclick、input、keydown、check、hover，将对应操作展示在 devtools 中
      updateCaseSteps(tabId, message);
    } else {
      // 没有任何操作，仅仅是将元素信息展示在 devtools 中
      sendMessageToDevtools(tabId, {
        dataType: 'runtime',
        ...message
      })
    }
  });
})

/**
 * 创建长链接，监听来自 devtools 的消息
 */
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((message) => {
    console.log('background onConnect', port)
    // 保存当前 port，每个页面都有一个独立的 port
    const tabId = message.tabId;
    port.connect = true;
    port.id = tabId;
    ports[tabId] = port;
    // devtools 面板交互
    switch (message.devtoolsAction) {
      case DEVTOOLS_ACTION_TAG.ELEMENT_SELECT:
        // 选择控制台中某一个元素
        chrome.tabs.sendMessage(tabId, message);
        break;
      case DEVTOOLS_ACTION_TAG.ELEMENT_ACTION:
        // 点击某一个元素对应的操作按钮
        chrome.tabs.sendMessage(tabId, message, () => {
          updateCaseSteps(tabId, message);
        });
        break;
      case DEVTOOLS_ACTION_TAG.CHANGE_TEMPLATE:
        // 切换模版
        chrome.storage.local.set({ 'storage-template': message.value }, () => {
          actions.template = message.value;
          if (!actions[tabId]) return;
          sendMessageToDevtools(tabId, { 
            dataType: 'actions',
            steps: actions[tabId].steps,
            template: actions.template 
          });
        });
        break;
      case DEVTOOLS_ACTION_TAG.CLEAN_CODE:
        // 清除代码
        if (!actions[tabId]) return;
        const steps = TEMPLATES.reduce((acc, curr) => {
          acc[curr] = [];
          return acc;
        }, {});
        actions[tabId].steps = steps;
        sendMessageToDevtools(tabId, { 
          dataType: 'actions',
          steps: actions[tabId].steps,
          template: actions.template 
        });
        break;
      case DEVTOOLS_ACTION_TAG.COPY_CODE:
        // 复制代码
        break;
      default:
        break;
    }
  })
})

/**
 * 监听开关
 * 点击图标可开启或关闭
 */
chrome.action.onClicked.addListener(() => {
  chrome.storage.local.get([ MACACA_RECORDER_ENABLED ], (result) => {
    console.log('background macaca recorder enabled:', result)
    let enabled = result[MACACA_RECORDER_ENABLED]
    chrome.storage.local.set({ 'macaca-recorder-enabled': !enabled }, () => {
      chrome.action.setBadgeText({ text: !enabled ? '' : 'NO' });
    });
  });
});

/**
 * 关闭 tab
 */
chrome.tabs.onRemoved.addListener((tabId) => {
  console.log('background onRemoved:', tabId, ports)
  delete actions[tabId];
  delete ports[tabId];
});


/**
 * 监听快捷键
 */
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const tab = tabs[0];
    const tabId = tab?.id;
    if (!tabId) return;
    if (command === 'mousemove_enabled') {
      chrome.tabs.sendMessage(tabId, {
        keyboardAction: KEYBOARD_ACTION.RESET_OPTION
      });
    }
  })
});