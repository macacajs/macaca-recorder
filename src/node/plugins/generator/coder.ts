/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { autowired, IEvent, IEventManager } from '@/core';
import IOptions from '@/isomorphic/services/options';
import { IBrowser, IBrowserFactory, IPage } from '@/node/services/browser';
import { ICodeGen } from '@/node/services/code-gen';
import { IWebServiceManager } from '@/node/services/coder-web-service';
import { Action } from '@/types/actions';
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

  url: string;

  @autowired(IBrowserFactory, true)
  factory: IBrowserFactory;

  @autowired(IEventManager, true)
  eventManager: IEventManager;

  @autowired(IOptions)
  options: IOptions;

  init() {
    this.afterStart = this.eventManager.createIEvent();
    this.beforeDispose = this.eventManager.createIEvent();
    this.afterBrowerLaunch = this.eventManager.createIEvent<IBrowser>();
    this.afterAppPageLaunch = this.eventManager.createIEvent<IPage>();
    this.afterPageLaunch = this.eventManager.createIEvent<IPage>();
  }

  async start(url: string): Promise<void> {
    this.url = url;
    const browser = this.factory.createAppBrowser();
    await browser.launch();

    await this.injectToBrowser(browser);

    // 触发事件， 方便外部插件在此时机进行函数暴漏
    this.afterBrowerLaunch.trigger(browser);

    await browser.start(`http://e2egen/`, path =>
      require.resolve(`./page/${path}`),
    );

    // 触发事件， 方便外部插件在此时机进行函数暴漏
    this.afterAppPageLaunch.trigger(browser.getAppPage()!);

    const page = await browser.open(url, { left: 600, width: 1000 });
    await browser.extendInjectedScript(extendSource);

    // 触发事件， 方便外部插件在此时机进行函数暴漏
    this.afterPageLaunch.trigger(page);

    this.appPage = browser.getAppPage();
    this.browser = browser;
    this.page = page;
    this.hasStart = true;

    this.afterStart.trigger();
  }

  async restartPage() {
    if (!this.browser) return;
    const page = await this.browser.open(this.url, { left: 600, width: 1000 });
    this.page?.close();
    this.page = page;
    // 触发事件， 方便外部插件在此时机进行函数暴漏
    this.afterPageLaunch.trigger(page);
  }

  async injectToBrowser(browser: IBrowser) {
    await browser.exposeBinding('getWebServices', false, () => {
      return this.webServices;
    });
    await browser.exposeBinding('getCodeServices', false, () => {
      return this.coderServices;
    });
    await browser.exposeBinding('requireSource', false, (_, path: string) => {
      return Require(path);
    });

    await browser.exposeBinding(
      '__handle_action',
      false,
      (_, action: Action) => {
        if (this.appPage) {
          this.appPage.evaluate(function (_action: Action) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.addAction(_action);
          }, action);
        }
      },
    );

    await browser.exposeBinding(
      '__invoke_cmd',
      false,
      (_, cmd: string, arg: any) => {
        if (this.page) {
          return this.page.invoke(cmd, arg);
        }
        return null;
      },
    );

    await browser.exposeBinding('__get_frame_id', false, _ => {
      if (this.page) {
        return this.page.id;
      }
      return null;
    });
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
