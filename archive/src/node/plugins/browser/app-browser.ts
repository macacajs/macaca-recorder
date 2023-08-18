import * as fs from 'fs';
import * as path from 'path';
import mime from 'mime';
import { createPlaywright } from 'playwright-core/lib/server';
import { FunctionWithSource, IBrowser, IPage } from '@/node/services/browser';
import {
  BrowserContext,
  BrowserTypeLaunchPersistentContextParams,
  FrameSession,
  mainFrameSession,
  Page,
  Route,
  serverSideCallMetadata,
  WindowBounds,
} from './types';
import IPageDelegate from './ipage-delegate';

function getNumber(value: unknown, defValue: number) {
  if (Number.isNaN(Number(value))) return defValue;
  return Number(value);
}

export default class AppBrowser implements IBrowser {
  playwright = createPlaywright('javascript', true);

  context: BrowserContext;

  appPage: Page;

  appFrameSession: FrameSession;

  async launch(
    option?: BrowserTypeLaunchPersistentContextParams & {
      posX?: number;
      posY?: number;
    },
  ) {
    const args = [
      '--app=data:text/html,',
      `--window-size=${getNumber(option?.viewport?.width, 600)},${getNumber(
        option?.viewport?.height,
        600,
      )}`,
      `--window-position=${getNumber(option?.posX, 0)},${getNumber(
        option?.posY,
        0,
      )}`,
      '--test-type=',
    ];
    this.context = await this.playwright.chromium.launchPersistentContext(
      serverSideCallMetadata(),
      '',
      {
        headless: !!process.env.TEST,
        args,
        ignoreDefaultArgs: ['--enable-automation'],
        noDefaultViewport: true,
        ...option,
      },
    );
  }

  async addInitScript(source: string) {
    if (this.context) {
      await this.context.addInitScript(source);
    }
  }

  async extendInjectedScript(source: string) {
    if (this.context) {
      await this.context.extendInjectedScript(source);
    }
  }

  async exposeBinding(
    name: string,
    needsHandle: boolean,
    playwrightBinding: FunctionWithSource,
  ) {
    if (this.context) {
      this.context.exposeBinding(name, needsHandle, (source, ...args) => {
        return playwrightBinding(
          { page: new IPageDelegate(source.page) },
          ...args,
        );
      });
    }
  }

  async start(baseURL: string, uriResolver: (uri: string) => string) {
    if (!this.context) return;
    const [page] = this.context.pages();

    this.appPage = page;
    this.appFrameSession = mainFrameSession(page);
    this.appFrameSession.init().then(() => {
      return this.appFrameSession.setWindowBounds({
        top: 0,
        left: 0,
      });
    });

    // eslint-disable-next-line no-underscore-dangle
    await page._setServerRequestInterceptor(async (route: Route) => {
      if (route.request().url().startsWith(baseURL)) {
        const uri = route.request().url().substring(baseURL.length);
        const file = uriResolver(uri);
        const buffer = fs.readFileSync(file);
        await route.fulfill({
          status: 200,
          headers: [
            {
              name: 'Content-Type',
              value:
                mime.getType(path.extname(file)) || 'application/octet-stream',
            },
          ],
          body: buffer.toString('base64'),
          isBase64: true,
        });
        return;
      }
      await route.continue();
    });

    const mainFrame = page.mainFrame();
    await mainFrame.goto(serverSideCallMetadata(), `${baseURL}index.html`);
  }

  async open(url: string, bounds?: WindowBounds): Promise<IPage> {
    const page = await this.context.newPage(serverSideCallMetadata());
    this.context.emit('page', page);
    const ipage = new IPageDelegate(page);
    if (bounds) await ipage.setWindowBounds(bounds);
    await page.mainFrame().goto(serverSideCallMetadata(), url);
    return ipage;
  }

  getAppPage(): IPage | null {
    if (!this.appPage) return null;
    return new IPageDelegate(this.appPage);
  }

  async dispose() {
    if (this.context) {
      await this.context.close(serverSideCallMetadata());
    }
  }
}
