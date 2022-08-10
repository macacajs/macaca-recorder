import { autowired } from '@/core';
import { IBrowser, IBrowserFactory, IPage } from '@/node/services/browser';
import { ICodeGen } from '@/node/services/code-gen';
import { IWebServiceManager } from '@/node/services/coder-web-service';
// eslint-disable-next-line import/no-unresolved
import extendSource from './generated/injected';
import Require from './require';

export default class CodeGen implements ICodeGen, IWebServiceManager {
  @autowired(IBrowserFactory)
  factory: IBrowserFactory;

  browser: IBrowser | null = null;

  appPage: IPage | null = null;

  page: IPage | null = null;

  hasStart = false;

  webServices: string[] = [];

  coderServices: string[] = [];

  async start(url: string): Promise<void> {
    const browser = this.factory.createAppBrowser();
    await browser.launch();
    await browser.exposeBinding('getWebServices', false, () => {
      return this.webServices;
    });
    await browser.exposeBinding('getCodeServices', false, () => {
      return this.coderServices;
    });

    await browser.exposeBinding('requireSource', false, (_, path: string) => {
      return Require(path);
    });

    await browser.start(uri => require.resolve(`./page/${uri}`));

    const page = await browser.open(url, { left: 600, width: 1000 });
    await page.extendInjectedScript(extendSource);

    page.exposeBinding('_pw_getdom_', false, (source, doms) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.info(doms[0].getAttribute('test-id'));
    });

    this.appPage = browser.getAppPage();
    this.browser = browser;
    this.page = page;
    this.hasStart = true;
  }

  async dispose() {
    await Promise.all([
      this.page?.dispose(),
      this.appPage?.dispose(),
      this.browser?.dispose(),
    ]);
    this.appPage = null;
    this.page = null;
    this.browser = null;
    this.hasStart = false;
  }

  isStart(): boolean {
    return this.hasStart;
  }

  getBrowser(): IBrowser | null {
    return this.browser;
  }

  getPage(): IPage | null {
    return this.page;
  }

  getAppPage(): IPage | null {
    return this.appPage;
  }

  addCoderPlugin(tsPath: string): void {
    this.coderServices.push(tsPath);
  }

  addWebPlugin(tsPath: string): void {
    this.webServices.push(tsPath);
  }
}
