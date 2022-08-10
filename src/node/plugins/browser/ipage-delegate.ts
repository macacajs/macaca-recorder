import { FunctionWithSource, IPage } from '@/node/services/browser';
import {
  FrameSession,
  mainFrameSession,
  Page,
  serverSideCallMetadata,
  WindowBounds,
} from './types';

export default class IPageDelegate implements IPage {
  private page: Page;

  session: FrameSession;

  constructor(page: Page, session?: FrameSession) {
    this.page = page;
    if (session) {
      this.session = session;
    } else {
      this.session = mainFrameSession(page);
    }
    this.session.init();
  }

  async close() {
    await this.page.close(serverSideCallMetadata());
  }

  url() {
    return this.page.mainFrame().url();
  }

  async evaluateExpression(
    expression: string,
    isFunction?: boolean,
    arg?: unknown,
  ) {
    return this.page
      .mainFrame()
      .evaluateExpression(expression, isFunction, arg);
  }

  async setWindowBounds(bounds: WindowBounds) {
    await this.session.init();
    await this.session.setWindowBounds(bounds);
  }

  async exposeBinding(
    name: string,
    needsHandle: boolean,
    playwrightBinding: FunctionWithSource,
  ) {
    await this.page.exposeBinding(name, needsHandle, (_source, ...args) => {
      return playwrightBinding({ page: this }, ...args);
    });
  }

  async extendInjectedScript(source: string) {
    await this.page.mainFrame().extendInjectedScript(source);
  }

  async dispose(): Promise<void> {
    await this.page.close(serverSideCallMetadata());
  }
}
