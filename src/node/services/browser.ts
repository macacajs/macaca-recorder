import { genInjectID } from '@/core';

export type FunctionWithSource = (
  // eslint-disable-next-line no-use-before-define
  source: { page: IPage },
  ...args: unknown[]
) => unknown;

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

export interface Bounds {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

export interface IPage {
  url(): string;
  close(): Promise<void>;
  evaluateExpression(
    expression: string,
    isFunction?: boolean,
    arg?: unknown,
  ): Promise<unknown>;
  setWindowBounds(bounds: Bounds): Promise<void>;
  exposeBinding(
    name: string,
    needsHandle: boolean,
    playwrightBinding: FunctionWithSource,
  ): Promise<void>;
}

export interface IBrowser {
  launch(option?: ILaunchOption): Promise<void>;
  addInitScript(source: string): Promise<void>;
  extendInjectedScript(source: string): Promise<void>;
  start(uriResolver: (uri: string) => string): Promise<void>;
  open(url: string, bounds?: Bounds): Promise<IPage>;
  getAppPage(): IPage | null;
}

export interface IBrowserFactory {
  createAppBrowser(): IBrowser;
}

export const ibrowserFactoryID = genInjectID<IBrowserFactory>();
