import { genInjectID, IEvent } from '@/core';

export interface IActions {
  name: string;
  action: () => Promise<void>;
}

/**
 * ui动作管理
 * 其他插件可以想ui里面注册动作
 * 会被渲染到顶部工具
 */

export interface IUIActions {
  readonly changeEvent: IEvent<void>;
  readonly uiActions: IActions[];
  registerAction(name: string, action: () => Promise<void>): void;
}

export const IUIActions = genInjectID<IUIActions>();

export default IUIActions;
