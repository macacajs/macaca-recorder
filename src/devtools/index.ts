import {
  COMMON_ACTIONS,
  DATA_MACACA_RECORDER_SELECT_TAG,
} from '@/constants';

/**
 * 监听调试面板消息
 */
chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
  // 重置上一个元素属性
  chrome.devtools.inspectedWindow.eval(`window.selectElement.removeAttribute("${DATA_MACACA_RECORDER_SELECT_TAG}")`);
  chrome.devtools.inspectedWindow.eval(
    `$0.setAttribute('${DATA_MACACA_RECORDER_SELECT_TAG}', true)
     window.selectElement=$0`,
    () => {
      chrome.runtime.sendMessage({
        action: COMMON_ACTIONS.DEVTOOLS_SELECT,
      });
    },
  );
});
