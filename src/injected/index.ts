/**
 *  recorder 前端代码
 */

import { App } from "@/core";
import ApiPlugin from "@/node/plugins/api";
import EventPlugin from "@/node/plugins/event";
import iapiID from "@/node/services/api";
import WebServicesPlugin from "./plugins/web-services";

async function start() {
  const app = await App.createApp(
    [ApiPlugin, EventPlugin, WebServicesPlugin],
    iapiID
  );
  await app.init();
}

start();
