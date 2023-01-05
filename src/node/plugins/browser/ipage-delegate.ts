import {
  FunctionWithSource,
  IPage,
  PageFunction,
} from '@/node/services/browser';
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

  get id() {
    // eslint-disable-next-line no-underscore-dangle
    return this.page.mainFrame()._id;
  }

  async close() {
    await this.page.close(serverSideCallMetadata());
  }

  url() {
    return this.page.mainFrame().url();
  }

  async evaluate<Arg, R>(
    pageFunction: PageFunction<Arg, R>,
    arg: Arg,
  ): Promise<R> {
    return this.evaluateExpression(
      String(pageFunction),
      typeof pageFunction === 'function',
      arg,
    );
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

  async bringToFront() {
    await this.page.bringToFront();
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

  async invoke(cmd: string, msg: any): Promise<any> {
    return this.session.invoke(cmd, msg);
  }

  on(eventName: string, callback: (arg: any) => void) {
    return this.session.on(eventName, callback);
  }

  off(eventName: string, callback: (arg: any) => void) {
    return this.session.off(eventName, callback);
  }
}
