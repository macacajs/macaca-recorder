/* eslint-disable import/no-import-module-exports */
/**
 *  injected 前端代码
 *  主要用来注入要录制的前端界面
 */

import { App } from "@/core";
import ApiPlugin from "@/node/plugins/api";
import EventPlugin from "@/node/plugins/event";
import IApi from "@/node/services/api";
import { InjectedScript } from "./lib/type";
import WebServicesPlugin from "./plugins/web-services";

declare global {
  interface Window {
    injected?: InjectedScript;
  }
}

class ConsoleExtends {
  app: IApi;

  constructor(injected: InjectedScript) {
    // 防止多次执行
    if (window.injected) return;
    window.injected = injected;
    this.startApp();
  }

  async startApp() {
    const app = await App.createApp(
      [ApiPlugin, EventPlugin, WebServicesPlugin],
      IApi
    );
    await app.init();
    this.app = app;
  }
}

// 注入console需要明确导出的类
module.exports = ConsoleExtends;
