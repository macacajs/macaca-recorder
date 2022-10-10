/* eslint-disable @typescript-eslint/no-explicit-any */
import { genInjectID } from '@/core';

export type FunctionWithSource = (
  // eslint-disable-next-line no-use-before-define
  source: { page: IPage },
  ...args: any[]
) => any;

export interface ILaunchOption {
  args?: string[];
  ignoreAllDefaultArgs?: boolean;
  ignoreDefaultArgs?: string[];
  timeout?: number;
  headless?: boolean;
  devtools?: boolean;
  proxy?: {
    server: string;
    bypass?: string;
    username?: string;
    password?: string;
  };
  downloadsPath?: string;
  tracesDir?: string;
  chromiumSandbox?: boolean;
  noDefaultViewport?: boolean;
  viewport?: {
    width: number;
    height: number;
  };
  screen?: {
    width: number;
    height: number;
  };
  ignoreHTTPSErrors?: boolean;
  javaScriptEnabled?: boolean;
  bypassCSP?: boolean;
  userAgent?: string;
  locale?: string;
  timezoneId?: string;
  geolocation?: {
    longitude: number;
    latitude: number;
    accuracy?: number;
  };
  permissions?: string[];
  offline?: boolean;
  httpCredentials?: {
    username: string;
    password: string;
  };
  deviceScaleFactor?: number;
  isMobile?: boolean;
  hasTouch?: boolean;
  colorScheme?: 'dark' | 'light' | 'no-preference';
  reducedMotion?: 'reduce' | 'no-preference';
  forcedColors?: 'active' | 'none';
  acceptDownloads?: boolean;
  baseURL?: string;
  recordVideo?: {
    dir: string;
    size?: {
      width: number;
      height: number;
    };
  };
  strictSelectors?: boolean;
  serviceWorkers?: 'allow' | 'block';
  userDataDir?: string;
  posX?: number;
  posY?: number;
}

export interface Session {
  invoke(cmd: string, msg: any): Promise<any>;
  on(eventName: string, callback: (arg: any) => void): void;
  off(eventName: string, callback: (arg: any) => void): void;
}

export interface Bounds {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

export type PageFunction<Arg, R> = string | ((arg: Arg) => R | Promise<R>);

export interface IPage extends Session {
  id: string;
  url(): string;
  close(): Promise<void>;
  evaluate<Arg, R>(func: PageFunction<Arg, R>, arg: Arg): Promise<R>;
  evaluateExpression(
    expression: string,
    isFunction?: boolean,
    arg?: unknown,
  ): Promise<unknown>;
  extendInjectedScript(source: string): Promise<void>;
  setWindowBounds(bounds: Bounds): Promise<void>;
  exposeBinding(
    name: string,
    needsHandle: boolean,
    playwrightBinding: FunctionWithSource,
  ): Promise<void>;
  dispose(): Promise<void>;
}

export interface IBrowser {
  launch(option?: ILaunchOption): Promise<void>;
  exposeBinding(
    name: string,
    needsHandle: boolean,
    playwrightBinding: FunctionWithSource,
  ): Promise<void>;
  addInitScript(source: string): Promise<void>;
  extendInjectedScript(source: string): Promise<void>;
  start(baseURL: string, uriResolver: (uri: string) => string): Promise<void>;
  open(url: string, bounds?: Bounds): Promise<IPage>;
  getAppPage(): IPage | null;
  dispose(): Promise<void>;
}

export interface IBrowserFactory {
  createAppBrowser(): IBrowser;
}

export const IBrowserFactory = genInjectID<IBrowserFactory>();
