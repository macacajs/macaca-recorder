import { autowired, IPlugin } from '@/core';
import IOptions from '@/isomorphic/services/options';
import IProxy, { IInject } from '@/isomorphic/services/proxy';
import ICodeGen from '@/node/services/code-gen';
import { EditorTemplate } from '@/node/template';
import { ITemplate } from '@/node/template/template';
import FS from './fs';

export default class ProxyPlugin implements IPlugin, IProxy, IInject {
  @autowired(ICodeGen)
  codeGen: ICodeGen;

  @autowired(IOptions)
  options: IOptions;

  fs = new FS();

  inject: IInject = this;

  template: ITemplate;

  async initTemplate() {
    switch (this.options.recorderEngine) {
      case 'editor':
        this.template = EditorTemplate;
        return;
      default:
        if (await this.fs.exists(this.options.recorderEngine)) {
          // eslint-disable-next-line import/no-dynamic-require, global-require
          this.template = require(this.options.recorderEngine);
        }
        throw new Error(`unsupport ${this.options.recorderEngine}`);
    }
  }

  async afterInit() {
    // 初始化模版
    await this.initTemplate();
    // 调用node模版
    await this.template.node({ coder: this.codeGen });
    // 注册proxy给recorder页面和injected页面
    this.codeGen.afterBrowerLaunch.on(browser => {
      browser.exposeBinding(
        '__proxyCall',
        false,
        (_, name: string, args: unknown[]) => {
          const fns = (name || '').split('.');
          if (!this[fns[0]] || !this[fns[0]][fns[1]]) {
            throw new Error(`unknow function name ${fns.join(',')}`);
          }
          return this[fns[0]][fns[1]].call(this[fns[0]], ...(args || []));
        },
      );
    });
  }

  /**
   * 将模版代码变成string导出
   * @param type 模版类型
   * @returns 返回模版代码
   */
  async getInjected(type: 'injected' | 'recorder'): Promise<string> {
    return this.template[type].toString();
  }

  async restartPage(): Promise<void> {
    return this.codeGen.restartPage();
  }

  async getOptions(): Promise<object> {
    return Object.keys(this.options).reduce((ret, key) => {
      if (typeof this.options[key] !== 'function') {
        // eslint-disable-next-line no-param-reassign
        ret[key] = this.options[key];
      }
      return ret;
    }, {} as Record<string, unknown>);
  }
}
