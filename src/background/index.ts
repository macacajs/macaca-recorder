/* global chrome */

import {
  COMMON_ACTIONS,
  KEYBOARD_ACTIONS,
  DEVTOOLS_ACTION,
  MACACA_RECORDER_TEMPLATE,
  MACACA_RECORDER_ENABLED,
} from '@/constants';
import {
  getStorageLocal,
  setStorageLocal,
} from '@/common/storage';
import templates from './templates';

const actions = {
  template: null,
};

/**
 * 获取当前tab
 */
const getCurrentTabs = () => {
  const tabId = new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const id = tabs[0]?.id;
      if (id) {
        resolve(id);
      } else {
        reject();
      }
    });
  });
  return tabId;
};

/**
 * 发送消息到 devtools
 * @param {number} tabId - tab id
 * @param {Object} opts - opts
 */
const sendMessageToDevtools = (tabId, opts = {}) => {
  const port = actions[tabId]?.port;
  console.log('background sendMessageToDevtools:', tabId, actions, port);
  if (port) {
    port.postMessage({
      ...opts,
    });
  }
};

/**
 * 初始化 tab 相关数据
 */
const resetTabData = (tabId) => {
  if (!Object.prototype.hasOwnProperty.call(actions, tabId)) {
    const steps = MACACA_RECORDER_TEMPLATE.TEMPLATES.reduce((acc, curr) => {
      acc[curr] = [];
      return acc;
    }, {});
    actions[tabId] = {
      steps,
      data: [],
      port: null,
    };
  }
};

/**
 * 更新操作步骤
 * @param tabId tabId
 * @param opts 选项
 */
const updateCaseSteps = (tabId: number, opts: {
  action?: string,
  selectors?: any,
  actionId?: number
} = {}) => {
  const {
    action,
    selectors,
    actionId,
  } = opts;

  if (!action) return;

  if (!selectors?.length) return;

  // input 防止重复写入
  if (action === COMMON_ACTIONS.INPUT) {
    const lastSteps = actions[tabId].data.slice(-1);
    if (lastSteps.length && lastSteps[0].actionId === actionId) {
      actions[tabId].steps.default = actions[tabId].steps.default.slice(0, -1);
      actions[tabId].steps.cypress = actions[tabId].steps.cypress.slice(0, -1);
      actions[tabId].data = actions[tabId].data.slice(0, -1);
    }
  }

  // 获取用例步骤
  const templatesCode = templates(opts);
  Object.keys(templatesCode).forEach((key) => {
    actions[tabId].steps[key].push(templatesCode[key]);
  });
  actions[tabId].data.push(opts);

  // 发送消息
  sendMessageToDevtools(tabId, {
    messageType: 'actions',
    steps: actions[tabId].steps,
    template: actions.template,
  });
};

/**
 * 事件初始化时调用
 */
chrome.runtime.onInstalled.addListener(async () => {
  console.log('plug-in has been initialized.');

  const template = await getStorageLocal(MACACA_RECORDER_TEMPLATE.CURRENT_TEMPLATE);
  actions.template = template || MACACA_RECORDER_TEMPLATE.DEFAULT;

  await setStorageLocal({ [MACACA_RECORDER_ENABLED]: true });

  chrome.action.setBadgeText({ text: 'ON' });
});

/**
 * 监听来自 content 的消息
 */
chrome.runtime.onMessage.addListener(async (message) => {
  if (!message) return;

  const tabId = await getCurrentTabs() as number;
  if (!tabId) return;
  resetTabData(tabId);

  if (message.action === COMMON_ACTIONS.MOUSEMOVE) {
    sendMessageToDevtools(tabId, {
      template: actions.template,
      messageType: 'runtime',
      ...message,
    });
  } else {
    updateCaseSteps(tabId, message);
  }
});

/**
 * 创建长链接，监听来自 devtools 的消息
 */
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (message) => {
    const tabId = await getCurrentTabs() as number;
    resetTabData(tabId);
    actions[tabId].port = port;

    switch (message.devtoolsAction) {
      case DEVTOOLS_ACTION.ELEMENT_SELECT: {
        chrome.tabs.sendMessage(tabId, message);
        break;
      }
      case DEVTOOLS_ACTION.ELEMENT_ACTION: {
        chrome.tabs.sendMessage(tabId, message, () => {
          updateCaseSteps(tabId, message);
        });
        break;
      }
      case DEVTOOLS_ACTION.CHANGE_TEMPLATE: {
        const { template } = message;
        await setStorageLocal({ [MACACA_RECORDER_TEMPLATE.CURRENT_TEMPLATE]: template });
        actions.template = template;
        sendMessageToDevtools(tabId, {
          messageType: 'actions',
          steps: actions[tabId].steps,
          template: actions.template,
        });
        break;
      }
      case DEVTOOLS_ACTION.CLEAN_CODE: {
        if (!actions[tabId]) return;
        const steps = MACACA_RECORDER_TEMPLATE.TEMPLATES.reduce((acc, curr) => {
          acc[curr] = [];
          return acc;
        }, {});
        actions[tabId].steps = steps;
        sendMessageToDevtools(tabId, {
          messageType: 'actions',
          steps: actions[tabId].steps,
          template: actions.template,
        });
        break;
      }
      case DEVTOOLS_ACTION.COPY_CODE: {
        break;
      }
      default: {
        break;
      }
    }
  });
});

/**
 * 监听开关
 * 点击图标可开启或关闭
 */
chrome.action.onClicked.addListener(async () => {
  const enabled = await getStorageLocal(MACACA_RECORDER_ENABLED);

  await setStorageLocal({ [MACACA_RECORDER_ENABLED]: !enabled });

  chrome.action.setBadgeText({ text: !enabled ? 'ON' : 'OFF' });

  const tabId = await getCurrentTabs() as number;
  chrome.tabs.sendMessage(tabId, {
    popupAction: MACACA_RECORDER_ENABLED,
    enabled: !enabled,
  });
});

/**
 * 监听快捷键
 */
chrome.commands.onCommand.addListener(async (command) => {
  const tabId = await getCurrentTabs() as number;
  if (!tabId) return;
  if (command !== MACACA_RECORDER_ENABLED) return;
  chrome.tabs.sendMessage(tabId, {
    keyboardAction: KEYBOARD_ACTIONS.RESET,
  });
});

/**
 * 关闭 tab
 */
chrome.tabs.onRemoved.addListener((tabId) => {
  delete actions[tabId];
});
