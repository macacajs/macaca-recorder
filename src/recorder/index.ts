/**
 *  recorder 前端代码
 */

import { App } from '@/core';
import ApiPlugin from '@/node/plugins/api';
import EventPlugin from '@/node/plugins/event';
import iapiID from '@/node/services/api';

async function start() {
  const app = App.createApp([ApiPlugin, EventPlugin], iapiID);
  await app.init();
}

start();
