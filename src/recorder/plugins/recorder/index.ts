import { autowired, IPlugin, IPluginManager } from '@/core';
import IOptions from '@/isomorphic/services/options';
import { IUIActions } from '@/recorder/services';
import EditorCodeGen from '../editor-code-gen';
import SkyCodeGen from '../sky-code-gen';

declare global {
  interface Window {
    __RestartPage(): Promise<void>;
  }
}

/**
 * 代码记录生成器插件
 */
export default class RecorderPlugin implements IPlugin {
  @autowired(IPluginManager)
  pluginManager: IPluginManager;

  @autowired(IOptions)
  options: IOptions;

  @autowired(IUIActions)
  actions: IUIActions;

  async beforeInit() {
    // 根据配置加载不同的代码生成器
    if (this.options.recorderEngine === 'editor') {
      this.pluginManager.registerPlugin(EditorCodeGen);
    } else {
      this.pluginManager.registerPlugin(SkyCodeGen);
    }
  }

  async afterInit() {
    this.actions.registerAction('重启', async () => {
      // eslint-disable-next-line no-underscore-dangle
      return window.__RestartPage();
    });
  }
}
