/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { autowired, IEvent, IEventManager } from '@/core';
import { IBrowser, IBrowserFactory, IPage } from '@/node/services/browser';
import { ICodeGen } from '@/node/services/code-gen';
import { IWebServiceManager } from '@/node/services/coder-web-service';
// eslint-disable-next-line import/no-unresolved
import extendSource from './generated/injected';
import Require from './require';

export default class CodeGen implements ICodeGen, IWebServiceManager {
  beforeDispose: IEvent<void>;

  afterStart: IEvent<void>;

  afterBrowerLaunch: IEvent<IBrowser>;

  afterAppPageLaunch: IEvent<IPage>;

  afterPageLaunch: IEvent<IPage>;

  browser: IBrowser | null = null;

  appPage: IPage | null = null;

  page: IPage | null = null;

  hasStart = false;

  webServices: string[] = [];

  coderServices: string[] = [];

  @autowired(IBrowserFactory)
  factory: IBrowserFactory;

  @autowired(IEventManager)
  eventManager: IEventManager;

  init() {
    this.afterStart = this.eventManager.createIEvent();
    this.beforeDispose = this.eventManager.createIEvent();
    this.afterBrowerLaunch = this.eventManager.createIEvent<IBrowser>();
    this.afterAppPageLaunch = this.eventManager.createIEvent<IPage>();
    this.afterPageLaunch = this.eventManager.createIEvent<IPage>();
  }

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

    // 触发事件， 方便外部插件在此时机进行函数暴漏
    this.afterBrowerLaunch.trigger(browser);

    await browser.start(uri => require.resolve(`./page/${uri}`));

    // 触发事件， 方便外部插件在此时机进行函数暴漏
    this.afterAppPageLaunch.trigger(browser.getAppPage()!);

    const page = await browser.open(url, { left: 600, width: 1000 });
    await page.extendInjectedScript(extendSource);

    // 触发事件， 方便外部插件在此时机进行函数暴漏
    this.afterPageLaunch.trigger(page);

    this.appPage = browser.getAppPage();
    this.browser = browser;
    this.page = page;
    this.hasStart = true;

    this.afterStart.trigger();
  }

  async dispose() {
    this.beforeDispose.trigger();
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
