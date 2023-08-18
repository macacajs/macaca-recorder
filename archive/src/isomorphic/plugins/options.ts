/* eslint-disable no-underscore-dangle */
import { autowired, IPlugin, IServiceManager } from '@/core';
import { IProxy } from '../services';
import IOptions, { CodeEngineType } from '../services/options';

export default class IOptionPlugin implements IPlugin, IOptions {
  startRecordOnFirst = false;

  recorderEngine: CodeEngineType = 'editor';

  showHightlight = true;

  @autowired(IServiceManager)
  srvManager: IServiceManager;

  @autowired(IProxy)
  proxy: IProxy;

  async registerSrv() {
    this.srvManager.registerServiceBean(IOptions, this);
  }

  async init() {
    // 初始化配置
    this.initOptions();
  }

  async initOptions() {
    // 初始化配置 如果是node则不存在这个函数
    if (this.proxy) {
      const options = await this.proxy.inject.getOptions();
      // 导入配置
      Object.assign(this, {
        ...options,
      });
    }
  }

  setRecorderEngine(engine: CodeEngineType): IOptions {
    this.recorderEngine = engine;
    return this;
  }

  setShowHighlight(show: boolean): IOptions {
    this.showHightlight = show;
    return this;
  }

  setStartRecordOnFirst(startRecord: boolean): IOptions {
    this.startRecordOnFirst = startRecord;
    return this;
  }
}
