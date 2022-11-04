import { autowired, IPlugin } from '@/core';
import ICodeGen from '@/node/services/code-gen';
import dumpFile from './dump-file';

export default class DumpFilePlugin implements IPlugin {
  @autowired(ICodeGen)
  codeGen: ICodeGen;

  async afterInit() {
    this.codeGen.afterAppPageLaunch.on(page => {
      page.exposeBinding('__onCodeChange', true, (_, code: string) => {
        dumpFile({
          code,
          targetUrl: this.codeGen.url,
        });
      });
    });
  }
}
