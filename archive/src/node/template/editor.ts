/* eslint-disable no-bitwise */
import { Action } from '@/types/actions';
import { ITemplate } from './template';

/**
 * 编辑器模版
 */
export const EditorTemplate = {
  async injected(api): Promise<void> {
    api.selector.registerSlot([
      api.selector.defaultSlots.testidSlot,
      api.selector.defaultSlots.classSlot,
    ]);
    api.recorder.registerSlot([
      api.recorder.defaultSlots.click,
      api.recorder.defaultSlots.selectonSlot,
      api.recorder.defaultSlots.keydown,
      api.recorder.defaultSlots.input,
    ]);
  },
  async node(api): Promise<void> {
    api.coder.afterBrowerLaunch.on(() => {
      console.info('after browser launch');
    });
  },
  async recorder(api): Promise<void> {
    interface TransFunc {
      // eslint-disable-next-line no-use-before-define
      (action: Action, context: EditorTransContext): void;
    }

    class EditorTransContext {
      actions: Action[] = [];

      codeList: string[] = ['const macacaHelper = new MacacaHelper()'];

      trans: TransFunc[] = [];

      clean() {
        this.actions = [];
        this.codeList = ['const macacaHelper = new MacacaHelper()'];
        api.setCode(this.getCode());
      }

      getCode() {
        return this.codeList.join('\n');
      }

      appendAction(action: Action) {
        for (let i = 0; i < this.trans.length; i += 1) {
          this.trans[i](action, this);
        }

        // 更新代码
        api.setCode(this.getCode());
      }
    }

    function clickTrans(action: Action, context: EditorTransContext) {
      if (action.name === 'custom' && action.data.type === 'preventClick') {
        context.actions.push(action);
      }
      if (action.name !== 'click') return;
      const prevAction = context.actions[context.actions.length - 1];

      if (
        prevAction &&
        prevAction.name === 'custom' &&
        prevAction.data.type === 'preventClick'
      ) {
        context.actions.pop();
        console.info(context.actions);
        return;
      }

      context.actions.push(action);
      if (typeof action.data === 'number') {
        context.codeList.push(
          `await macacaHelper.click(${JSON.stringify(action.selector)}, ${
            action.data
          })`,
        );
      } else {
        context.codeList.push(
          `await macacaHelper.click(${JSON.stringify(action.selector)})`,
        );
      }
    }

    function fillTrans(action: Action, context: EditorTransContext): void {
      if (action.name !== 'fill') return;

      let prevAction = context.actions[context.actions.length - 1];
      if (
        prevAction &&
        prevAction.name === 'press' &&
        action.name === 'fill' &&
        action.text === prevAction.key
      ) {
        context.actions.pop();
        context.codeList.pop();
        prevAction = context.actions[context.actions.length - 1];
      }

      if (
        prevAction &&
        prevAction.name === 'fill' &&
        action.name === 'fill' &&
        prevAction.selector === action.selector
      ) {
        context.actions.pop();
        context.codeList.pop();
        const newAction: Action = {
          name: 'fill',
          selector: action.selector,
          signals: action.signals,
          text: prevAction.text + action.text,
        };
        context.actions.push(newAction);
        context.codeList.push(
          `await macacaHelper.fill(${JSON.stringify(newAction.text)})`,
        );
      } else {
        context.actions.push(action);
        context.codeList.push(
          `await macacaHelper.fill(${JSON.stringify(action.text)})`,
        );
      }
    }

    function pressTrans(action: Action, context: EditorTransContext) {
      if (action.name !== 'press') return;
      if (['Meta', 'Control', 'Alt'].includes(action.key)) return;

      const keys = [action.key];
      if (action.modifiers & 4) {
        keys.unshift('Meta');
      }
      if (action.modifiers & 2) {
        keys.unshift('Control');
      }
      if (action.modifiers & 1) {
        keys.unshift('Alt');
      }

      context.actions.push(action);
      context.codeList.push(
        `await macacaHelper.press(${JSON.stringify(keys.join('+'))})`,
      );
    }

    function SelectionChangeTrans(action: Action, context: EditorTransContext) {
      if (action.name === 'custom' && action.data.type === 'selectionchange') {
        const { startSelector, startOffset, endSelector, endOffset } =
          action.data;
        context.actions.push(action);
        if (!endSelector) {
          context.codeList.push(
            `await macacaHelper.makeSelection(${JSON.stringify(
              startSelector,
            )}, ${startOffset})`,
          );
        } else {
          context.codeList.push(
            `await macacaHelper.makeSelection(${JSON.stringify(
              startSelector,
            )}, ${startOffset}, ${JSON.stringify(endSelector)}, ${endOffset})`,
          );
        }
      }
    }

    const editorTrans = new EditorTransContext();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.addAction = (action: Action) => editorTrans.appendAction(action);

    editorTrans.trans = [
      clickTrans,
      fillTrans,
      pressTrans,
      SelectionChangeTrans,
    ];

    // 注册清理按钮
    api.uiActions.registerAction('清空', async () => {
      editorTrans.clean();
    });
    // 注册重启按钮
    api.uiActions.registerAction('重启', async () => {
      editorTrans.clean();
      await api.proxy.inject.restartPage();
    });

    api.setCode(editorTrans.getCode());
  },
} as ITemplate;

export default EditorTemplate;
