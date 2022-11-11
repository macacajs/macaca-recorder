/* eslint-disable no-underscore-dangle */
/**
 * 记录编辑器选区的变化
 * 目前基于静态数据生成，会获取编辑器的node id，所以在开启录制前要先准备好数据
 */

import { IRecorderContext } from '@/injected/services';
import { CustomAction } from '@/types/actions';

declare global {
  interface Node {
    _neRef?: object & { id: string }; // 编辑器注入node的变量
  }
}

const EDITOR_CLASSNAME = 'ne-engine';

/**
 * 获取当前node路径
 * @param node dom
 */
function genEditorNodeSelector(node: Node) {
  let loopNode: Node | ParentNode | null = node;
  const ret: Array<string | number> = [];
  while (!(loopNode as Element).classList?.contains(EDITOR_CLASSNAME)) {
    let path = 0;
    const parentNode = loopNode?.parentNode;
    while (loopNode?.previousSibling) {
      path += 1;
      loopNode = loopNode.previousSibling;
    }
    if (!parentNode) {
      return null;
    }
    ret.unshift(path);
    loopNode = parentNode;
  }
  if ((loopNode as Element).classList?.contains(EDITOR_CLASSNAME)) {
    return ret;
  }
  return null;
}

function isEditorNode(node: Node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return !!node.parentElement?.closest(`.${EDITOR_CLASSNAME}`);
  }
  return !!(node as Element).closest(`.${EDITOR_CLASSNAME}`);
}

// 标记是否开始记录选区变化
let startRecord = false;
let lastSelectionAction: null | CustomAction = null;

export default function selectionSlot(
  type: string,
  event: MouseEvent,
  context: IRecorderContext,
) {
  // 鼠标左键按下
  if (event.type === 'mousedown' && event.button === 0) {
    console.info('mousedown', event.target, isEditorNode(event.target as Node));
    if (isEditorNode(event.target as Node)) {
      startRecord = true;
    }
    return false;
  }
  // 鼠标左键抬起
  if (event.type === 'mouseup' && event.button === 0) {
    if (startRecord && lastSelectionAction) {
      startRecord = false;
      context.addAction(lastSelectionAction);
      context.addAction({
        name: 'custom',
        signals: [],
        data: { type: 'preventClick' },
      });
      lastSelectionAction = null;
    }
    return false;
  }

  /**
   * 选区发生了变化，用户的行为应该是 鼠标按下 鼠标抬起，获取前面的事件，以及判断事件顺序，得到用户的操作路径
   */
  if (event.type === 'selectionchange' && startRecord) {
    const range = document.getSelection()?.getRangeAt(0);
    if (!range) return false;
    const { startContainer, startOffset, endContainer, endOffset, collapsed } =
      range;
    const startSelector = genEditorNodeSelector(startContainer);
    const endSelector = genEditorNodeSelector(endContainer);
    console.info(startContainer, startSelector, startOffset);
    if (collapsed && startSelector) {
      lastSelectionAction = {
        name: 'custom',
        signals: [],
        data: {
          type: 'selectionchange',
          startSelector,
          startOffset,
        },
      };
    } else if (startSelector && endSelector) {
      lastSelectionAction = {
        name: 'custom',
        signals: [],
        data: {
          type: 'selectionchange',
          startSelector,
          startOffset,
          endSelector,
          endOffset,
        },
      };
    }
  }

  return false;
}
