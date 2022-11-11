/**
 *  recorder 前端代码
 */

import { App } from '@/core';
import ApiPlugin from '@/node/plugins/api';
import EventPlugin from '@/node/plugins/event';
import { IApi } from '@/node/services/api';
import IOptionPlugin from '@/isomorphic/plugins/options';
import ProxyPlugin from '@/isomorphic/plugins/proxy';
import ActionsPlugin from './plugins/actions';
import ProtocolPlugin from './plugins/protocol';
import UIPlugin from './plugins/ui';
import WebServicesPlugin from './plugins/web-services';
import DumpFilePlugin from './plugins/dump-file';
import TemplatePlugin from './plugins/template';

async function start() {
  const app = await App.createApp(
    [
      ApiPlugin,
      EventPlugin,
      IOptionPlugin,
      WebServicesPlugin,
      ActionsPlugin,
      ProtocolPlugin,
      UIPlugin,
      DumpFilePlugin,
      ProxyPlugin,
      TemplatePlugin,
    ],
    IApi,
  );
  await app.init();
}

setTimeout(start, 0);
