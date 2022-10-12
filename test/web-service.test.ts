import { App } from '@/core';
import ApiPlugin from '@/node/plugins/api';
import AssetsServerPlugin from '@/node/plugins/assets-server';
import BrowserPlugin from '@/node/plugins/browser';
import EventPlugin from '@/node/plugins/event';
import GeneratorPlugin from '@/node/plugins/generator';
import { IApi } from '@/node/services/api';
import IAssetsServer from '@/node/services/assets-server';
import IWebServiceManager from '@/node/services/coder-web-service';
import { expect } from 'chai';
import path from 'path';

describe('web service', () => {
  let app: IApi;

  afterEach(async () => {
    await app.dispose();
  });

  it('add web service should be ok', async () => {
    app = await App.createApp(
      [
        ApiPlugin,
        BrowserPlugin,
        AssetsServerPlugin,
        GeneratorPlugin,
        EventPlugin,
      ],
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

      const serviceManager = app.getService(IWebServiceManager);
      expect(serviceManager).not.equal(null);

      serviceManager?.addWebPlugin(
        require.resolve('./assets/plugins/webPlugin.ts'),
      );

      await app.codeGen.start('http://localhost:30991');

      expect(
        await app.codeGen.getPage()?.evaluateExpression(`
      new Promise(resolve=>setTimeout(resolve, 100)).then(() => window.WEB_PLUGIN)
      `),
      ).to.equal(true);
    } finally {
      await server?.stop();
    }
  }).timeout(999999);

  it('add code service should be ok', async () => {
    app = await App.createApp(
      [
        ApiPlugin,
        BrowserPlugin,
        AssetsServerPlugin,
        GeneratorPlugin,
        EventPlugin,
      ],
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

      const serviceManager = app.getService(IWebServiceManager);
      expect(serviceManager).not.equal(null);

      serviceManager?.addCoderPlugin(
        require.resolve('./assets/plugins/webPlugin.ts'),
      );

      await app.codeGen.start('http://localhost:30991');

      expect(
        await app.codeGen.getAppPage()?.evaluateExpression(`
      new Promise(resolve=>setTimeout(resolve, 100)).then(() => window.WEB_PLUGIN)
      `),
      ).to.equal(true);
    } finally {
      await server?.stop();
    }
  }).timeout(999999);
});
