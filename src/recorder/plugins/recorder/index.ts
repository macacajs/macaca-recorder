import { autowired, IPlugin, IPluginManager } from '@/core';
import IOptions from '@/isomorphic/services/options';
import { IUIActions } from '@/recorder/services';
import EditorCodeGen from '../editor-code-gen';
import SkyCodeGen from '../sky-code-gen';
import MacacaWDGen from '../macaca-wd-code-gen';

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
    const { recorderEngine = 'macaca' } = this.options;
    // 根据配置加载不同的代码生成器
    if (recorderEngine === 'editor') {
      this.pluginManager.registerPlugin(EditorCodeGen);
    } else if (recorderEngine === 'sky') {
      this.pluginManager.registerPlugin(SkyCodeGen);
    } else {
      this.pluginManager.registerPlugin(MacacaWDGen);
    }
  }

  async afterInit() {
    this.actions.registerAction('重启', async () => {
      // eslint-disable-next-line no-underscore-dangle
      return window.__RestartPage();
    });
  }
}
