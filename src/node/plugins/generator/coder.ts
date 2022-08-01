import { autowired } from '@/core';
import { IBrowserFactory, ibrowserFactoryID } from '@/node/services/browser';
import { ICodeGen } from '@/node/services/code-gen';
import extendSource from './generated/injected';

export default class CodeGen implements ICodeGen {
  @autowired(ibrowserFactoryID)
  factory: IBrowserFactory;

  async start(url: string): Promise<void> {
    const browser = this.factory.createAppBrowser();
    await browser.launch();
    await browser.extendInjectedScript(extendSource);
    await browser.start(uri => require.resolve(`./page/${uri}`));
    const page = await browser.open(url, { left: 600, width: 1000 });
    page.exposeBinding('_pw_getdom_', false, (source, doms) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.info(doms[0].getAttribute('test-id'));
    });
  }
}
