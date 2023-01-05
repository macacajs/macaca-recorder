import { IHighlight, IRecorder, ISelector } from '@/injected/services';
import { IProxy } from '@/isomorphic/services';
import { IActions, IUIActions } from '@/recorder/services';
import ICodeGen from '../services/code-gen';

/**
 * 模版定义
 */
export interface ITemplate {
  /**
   * 注入到测试页面的代码 \
   * 里面不可以使用函数外部定义的变量，后续可以支持import 打包好的js 直接注入到页面内
   * @param api 可以使用的接口
   */
  injected: (api: {
    selector: ISelector;
    recorder: IRecorder;
    highlight: IHighlight;
    proxy: IProxy;
  }) => Promise<void>;
  /**
   * 注入到node的代码 \
   * 里面可以使用外面定义的变量
   * @param api 可以使用的接口
   */
  node: (api: { coder: ICodeGen }) => Promise<void>;
  /**
   * 注入到recorder页面的代码 \
   * 里面不可以使用函数外部定义的变量，后续可以支持import 打包好的js 直接注入到页面内
   * @param api 可以使用的接口
   */
  recorder: (api: {
    actions: IActions;
    uiActions: IUIActions;
    proxy: IProxy;
    setCode: (code: string) => void;
  }) => Promise<void>;
}
