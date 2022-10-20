/* eslint-disable no-underscore-dangle */
import { autowired, IPlugin, IServiceManager } from '@/core';
import IOptions, { CodeEngineType } from '../services/options';

export default class IOptionPlugin implements IPlugin, IOptions {
  recorderEngine: CodeEngineType = 'editor';

  @autowired(IServiceManager)
  srvManager: IServiceManager;

  async registerSrv() {
    this.srvManager.registerServiceBean(IOptions, this);
    // 初始化配置
    this.initOptions();
  }

  async initOptions() {
    // 初始化配置 如果是node则不存在这个函数
    if (globalThis?.__GetOptions) {
      const options = await globalThis?.__GetOptions();
      this.recorderEngine =
        (options.recorderEngine as CodeEngineType) || 'editor';
    }
  }

  setRecorderEngine(engine: CodeEngineType): IOptions {
    this.recorderEngine = engine;
    return this;
  }
}
