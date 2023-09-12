export const MACACA_RECORDER = 'macaca-recorder';

export const MACACA_RECORDER_TEMPLATE = {
  TEMPLATES: ['macaca', 'cypress'],
  MACACA: 'macaca',
  CYPRESS: 'cypress',
  CURRENT_TEMPLATE: 'current-template',
};

export const COMMON_ACTIONS = {
  MOUSEMOVE: 'mousemove',
  CLICK: 'click',
  DBLCLICK: 'dblclick',
  INPUT: 'input',
  KEYDOWN: 'keydown',
  CHECK: 'check',
  COPY: 'copy',
  HOVER: 'hover',
  CHANGE: 'change',
  COPY_CODE: 'copy-code',
  CLEAN_CODE: 'clean-code',
  CHANGE_TEMPLATE: 'change-template',
  DEVTOOLS_SELECT: 'devtools-select', // 调试面板选中元素
};

export const KEYBOARD_ACTIONS = {
  ENTER: 'Enter',
};

export const MACACA_RECORDER_EVENT_ACTIONS = {
  UPDATE_SELECTORS: 'update-selectors',
  UPDATE_STEPS: 'update-steps',
  UPDATE_MAIN_SWITCH: 'update-main-switch',
  UPDATE_MOUSE_SWITCH: 'update-mouse-switch',
  COPY_CODE: 'copy-code',

};

export const ATTRIBUTE_NAMES_CONFIG = ['data-testid', 'data-name', 'id', 'title', 'placeholder', 'name', 'value', 'class'];

// 插件开关
export const MACACA_RECORDER_ENABLED = 'macaca-recorder-enabled';

// 插件容器 id
export const MACACA_RECORDER_CONTAINER = 'macaca-recorder-container';

// 插件提示组件 id
export const MACACA_RECORDER_CONTAINER_TOOLTIP = 'macaca-recorder-container-tooltip';

// devtools 选中元素标记
export const DATA_MACACA_RECORDER_SELECT_TAG = 'data-macaca-recorder-select-tag';
