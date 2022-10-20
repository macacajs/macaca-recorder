import { autowired, IPlugin, IPluginManager } from '@/core';
import IOptions from '@/isomorphic/services/options';
import EditorCodeGen from '../editor-code-gen';
import MacacaCodeGen from '../macaca-code-gen';

/**
 * 代码记录生成器插件
 */
export default class RecorderPlugin implements IPlugin {
  @autowired(IPluginManager)
  pluginManager: IPluginManager;

  @autowired(IOptions)
  options: IOptions;

  async beforeInit() {
    // 根据配置加载不同的代码生成器
    if (this.options.recorderEngine === 'editor') {
      this.pluginManager.registerPlugin(EditorCodeGen);
    } else {
      this.pluginManager.registerPlugin(MacacaCodeGen);
    }
  }
}
