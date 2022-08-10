/**
 *  recorder 前端代码
 */

import { App } from '@/core';
import ApiPlugin from '@/node/plugins/api';
import EventPlugin from '@/node/plugins/event';
import { IApi } from '@/node/services/api';
import WebServicesPlugin from './plugins/web-services';

async function start() {
  const app = await App.createApp(
    [ApiPlugin, EventPlugin, WebServicesPlugin],
    IApi,
  );
  await app.init();
}

setTimeout(start, 0);
