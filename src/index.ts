import { App } from './core';
import ApiPlugin from './node/plugins/api';
import BrowserPlugin from './node/plugins/browser';
import EventPlugin from './node/plugins/event';
import GeneratorPlugin from './node/plugins/generator';
import iapiID from './node/services/api';

const app = App.createApp(
  [ApiPlugin, EventPlugin, GeneratorPlugin, BrowserPlugin],
  iapiID,
);

app.init().then(async () => {
  console.info('start');
  await app.codeGen.start('http://localhost:8181/_examples/desktop');
  // const page = await app.pageManager.open('https://www.baidu.com');
  console.info('after open page');

  // await page.close();
});
