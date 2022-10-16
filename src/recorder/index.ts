/**
 *  recorder 前端代码
 */

import { App } from '@/core';
import ApiPlugin from '@/node/plugins/api';
import EventPlugin from '@/node/plugins/event';
import { IApi } from '@/node/services/api';
import ActionsPlugin from './plugins/actions';
// import EditorCodeGen from './plugins/editor-code-gen';
import MacacaCodeGen from './plugins/macaca-code-gen';
import ProtocolPlugin from './plugins/protocol';
import UIPlugin from './plugins/ui';
import WebServicesPlugin from './plugins/web-services';

async function start() {
  const app = await App.createApp(
    [
      ApiPlugin,
      EventPlugin,
      WebServicesPlugin,
      ActionsPlugin,
      ProtocolPlugin,
      UIPlugin,
      // EditorCodeGen,
      MacacaCodeGen,
    ],
    IApi,
  );
  await app.init();
}

setTimeout(start, 0);
