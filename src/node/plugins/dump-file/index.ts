import { autowired, IPlugin } from '@/core';
import ICodeGen from '@/node/services/code-gen';

export default class DumpFilePlugin implements IPlugin {
  @autowired(ICodeGen)
  codeGen: ICodeGen;

  async afterInit() {
    this.codeGen.afterAppPageLaunch.on(page => {
      page.exposeBinding('__onCodeChange', true, (_, code: string) => {
        console.info('code: %s', code);
      });
    });
  }
}
