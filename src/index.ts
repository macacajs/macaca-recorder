import { App } from './core';
import IOptionPlugin from './isomorphic/plugins/options';
import ApiPlugin from './node/plugins/api';
import BrowserPlugin from './node/plugins/browser';
import EventPlugin from './node/plugins/event';
import GeneratorPlugin from './node/plugins/generator';
import UIStatePlugin from './node/plugins/ui-state';
import iapiID from './node/services/api';

async function start() {
  const app = await App.createApp(
    [
      ApiPlugin,
      IOptionPlugin,
      EventPlugin,
      GeneratorPlugin,
      BrowserPlugin,
      UIStatePlugin,
    ],
    iapiID,
  );

  await app.init();
  // 设置代码生成引擎
  app.options.setRecorderEngine('editor').setShowHighlight(false);

  await app.codeGen.start('http://localhost:8180/_examples/note');
}

start();
