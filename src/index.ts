require('dotenv').config();

import { App } from './core';
import IOptionPlugin from './isomorphic/plugins/options';
import ApiPlugin from './node/plugins/api';
import BrowserPlugin from './node/plugins/browser';
import EventPlugin from './node/plugins/event';
import GeneratorPlugin from './node/plugins/generator';
import UIStatePlugin from './node/plugins/ui-state';
import iapiID from './node/services/api';

const { MACACA_RECORDER_TARGET_URL } = process.env;

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

  // 设置代码生成引擎
  // app.options.setRecorderEngine('editor').setShowHighlight(false);
  app.options
    .setRecorderEngine('macaca')
    .setShowHighlight(false)
    .setStartRecordOnFirst(true);

  await app.init();

  await app.codeGen.start(MACACA_RECORDER_TARGET_URL || 'http://localhost:8081');
}

start();
