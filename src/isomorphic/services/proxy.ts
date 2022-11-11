/**
 * 提供node能力到injected和recorder
 * ⚠️只能提供方法，以及必须是promise返回
 */

import { genInjectID } from '@/core';

/**
 * 提供文件系统能力
 */
export interface IFS {
  cwd(): Promise<string>;
  exists(path: string): Promise<boolean>;
}

/** *
 * 注入配置，给外界提供注入脚本的机会
 */
export interface IInject {
  /**
   * 获取注入的配置代码
   * @param type recorder使用或者injected使用
   */
  getInjected(type: 'recorder' | 'injected'): Promise<string>;

  /**
   * 重启测试页面
   */
  restartPage(): Promise<void>;

  /**
   * 获取node层的配置
   */
  getOptions(): Promise<object>;
}

/**
 * 提供node能力代理
 * -----------
 * 1. **fs**:{@link IFS} 文件操作
 * 2. **inject**:{@link IInject} 注入配置代码获取
 */
export interface IProxy {
  fs: IFS;
  inject: IInject;
}

export const IProxy = genInjectID<IProxy>();

export default IProxy;
