/* global chrome */

import {
  COMMON_ACTIONS,
  MACACA_RECORDER_TEMPLATE,
  MACACA_RECORDER_ENABLED,
  MACACA_RECORDER_EVENT_ACTIONS,
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
    };
  }
};

/**
 * 更新操作步骤
 * @param tabId tabId
 * @param opts 选项
 */
const getCaseSteps = (tabId: number, opts: {
  action?: string,
  selectors?: any,
  actionId?: number
} = {}) => {
  const {
    action,
    selectors,
    actionId,
  } = opts;

  if (!action) return {};

  if (!selectors?.length) return {};

  // input 防止重复写入
  if (action === COMMON_ACTIONS.INPUT) {
    const lastSteps = actions[tabId].data.slice(-1);
    if (lastSteps.length && lastSteps[0].actionId === actionId) {
      actions[tabId].steps.macaca = actions[tabId].steps.macaca.slice(0, -1);
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

  return actions[tabId];
};

/**
 * 事件初始化时调用
 */
chrome.runtime.onInstalled.addListener(async () => {
  console.log('plug-in has been initialized.');

  const template = await getStorageLocal(MACACA_RECORDER_TEMPLATE.CURRENT_TEMPLATE);
  actions.template = template || MACACA_RECORDER_TEMPLATE.MACACA;

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

  switch (message.action) {
    case COMMON_ACTIONS.CHANGE_TEMPLATE: {
      const { template } = message;
      await setStorageLocal({ [MACACA_RECORDER_TEMPLATE.CURRENT_TEMPLATE]: template });
      actions.template = template;
      const steps = actions[tabId]?.steps[actions.template || MACACA_RECORDER_TEMPLATE.MACACA];
      chrome.tabs.sendMessage(tabId, {
        eventAction: MACACA_RECORDER_EVENT_ACTIONS.UPDATE_STEPS,
        steps,
        template: actions.template,
      });
      break;
    }
    case COMMON_ACTIONS.CLEAN_CODE: {
      const steps = MACACA_RECORDER_TEMPLATE.TEMPLATES.reduce((acc, curr) => {
        acc[curr] = [];
        return acc;
      }, {});
      actions[tabId].steps = steps;
      chrome.tabs.sendMessage(tabId, {
        eventAction: MACACA_RECORDER_EVENT_ACTIONS.UPDATE_STEPS,
        steps: [],
        template: actions.template,
      });
      break;
    }
    case COMMON_ACTIONS.COPY_CODE: {
      chrome.tabs.sendMessage(tabId, {
        eventAction: MACACA_RECORDER_EVENT_ACTIONS.COPY_CODE,
        template: actions.template,
      });
      break;
    }
    case COMMON_ACTIONS.CLICK:
    case COMMON_ACTIONS.DBLCLICK:
    case COMMON_ACTIONS.HOVER:
    case COMMON_ACTIONS.CHECK:
    case COMMON_ACTIONS.INPUT:
    case COMMON_ACTIONS.KEYDOWN: {
      const data = getCaseSteps(tabId, message);
      const steps = data?.steps[actions.template || MACACA_RECORDER_TEMPLATE.MACACA];
      chrome.tabs.sendMessage(tabId, {
        eventAction: MACACA_RECORDER_EVENT_ACTIONS.UPDATE_STEPS,
        steps,
        template: actions.template,
        action: message.action,
      });
      break;
    }
    default:
      break;
  }
});

/**
 * 监听开关
 * 点击图标可开启或关闭
 */
chrome.action.onClicked.addListener(async () => {
  const enabled = await getStorageLocal(MACACA_RECORDER_ENABLED);

  await setStorageLocal({ [MACACA_RECORDER_ENABLED]: !enabled });

  chrome.action.setBadgeText({ text: !enabled ? 'ON' : 'OFF' });

  // 销毁每个页面相关数据
  Object.keys(actions).forEach((key) => {
    if (key !== 'template') {
      delete actions[key];
    }
  });

  // 销毁当前相关组件，其它页面刷新即可，不作通知
  const tabId = await getCurrentTabs() as number;
  chrome.tabs.sendMessage(tabId, {
    eventAction: MACACA_RECORDER_EVENT_ACTIONS.UPDATE_MAIN_SWITCH,
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
    eventAction: MACACA_RECORDER_EVENT_ACTIONS.UPDATE_MOUSE_SWITCH,
  });
});

/**
 * 关闭 tab
 */
chrome.tabs.onRemoved.addListener((tabId) => {
  delete actions[tabId];
});
