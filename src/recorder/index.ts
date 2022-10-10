/**
 *  recorder 前端代码
 */

import { App } from '@/core';
import ApiPlugin from '@/node/plugins/api';
import EventPlugin from '@/node/plugins/event';
import { IApi } from '@/node/services/api';
import ActionsPlugin from './plugins/actions';
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
    ],
    IApi,
  );
  await app.init();
}

setTimeout(start, 0);
