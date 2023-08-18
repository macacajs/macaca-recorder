import * as fs from 'fs';
import * as path from 'path';
import { expect } from 'chai';
import { App } from '@/core';
import ApiPlugin from '@/node/plugins/api';
import BrowserPlugin from '@/node/plugins/browser';
import { IApi } from '@/node/services/api';
import { IBrowserFactory } from '@/node/services/browser';
import AssetsServerPlugin from '@/node/plugins/assets-server';
import IAssetsServer from '@/node/services/assets-server';

describe('test browser', () => {
  let app: IApi;

  afterEach(async () => {
    await app.dispose();
  });

  it('launch should be ok', async () => {
    app = await App.createApp([ApiPlugin, BrowserPlugin], IApi);
    await app.init();

    const factory = app.getService(IBrowserFactory);
    expect(factory).not.equal(null);

    const browser = factory?.createAppBrowser();
    expect(browser).not.equal(null);

    await browser?.launch({ headless: true });
    await browser?.start('http://e2egen/', uri =>
      require.resolve(`./assets/${uri}`),
    );

    const appPage = browser?.getAppPage();
    expect(appPage).not.equal(null);

    expect(await appPage?.evaluateExpression('document.title')).to.equal(
      'test app page name',
    );
  }).timeout(5000);

  it('addInitScript should be work', async () => {
    app = await App.createApp([ApiPlugin, BrowserPlugin], IApi);
    await app.init();

    const factory = app.getService(IBrowserFactory);
    expect(factory).not.equal(null);

    const browser = factory?.createAppBrowser();
    expect(browser).not.equal(null);

    await browser?.launch({ headless: true });
    await browser?.addInitScript('window.someValue = "123"');
    await browser?.start('http://e2egen/', uri =>
      require.resolve(`./assets/${uri}`),
    );

    const appPage = browser?.getAppPage();
    expect(appPage).not.equal(null);

    expect(await appPage?.evaluateExpression('window.someValue')).to.equal(
      '123',
    );
  }).timeout(5000);

  it('extendInjectedScript should be work', async () => {
    app = await App.createApp([ApiPlugin, BrowserPlugin], IApi);
    await app.init();

    const factory = app.getService(IBrowserFactory);
    expect(factory).not.equal(null);

    const browser = factory?.createAppBrowser();
    expect(browser).not.equal(null);

    await browser?.launch({ headless: true });
    await browser?.extendInjectedScript(
      fs.readFileSync(require.resolve('./assets/extend.js')).toString(),
    );
    await browser?.start('http://e2egen/', uri =>
      require.resolve(`./assets/${uri}`),
    );

    const appPage = browser?.getAppPage();
    expect(appPage).not.equal(null);

    // evaluateExpression execute before then extendsInjectedScript
    expect(
      await appPage?.evaluateExpression(
        'new Promise(resolve=>setTimeout(resolve, 100)).then(() => window.extends.hello())',
      ),
    ).to.equal('hello world');
  }).timeout(5000);

  it('open should be work', async () => {
    app = await App.createApp(
      [ApiPlugin, BrowserPlugin, AssetsServerPlugin],
      IApi,
    );
    await app.init();

    const server = app.getService(IAssetsServer);
    expect(server).not.equal(null);
    try {
      await server?.start(
        'localhost',
        30991,
        path.dirname(require.resolve('./assets/index.html')),
      );

      const factory = app.getService(IBrowserFactory);
      expect(factory).not.equal(null);

      const browser = factory?.createAppBrowser();
      expect(browser).not.equal(null);

      await browser?.launch({ headless: true });
      const page = await browser?.open('http://localhost:30991/');
      expect(page).not.equal(null);

      // evaluateExpression execute before then extendsInjectedScript
      expect(await page?.evaluateExpression('document.title')).to.equal(
        'test app page name',
      );
    } finally {
      await server?.stop();
    }
  }).timeout(10000);
});
