/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import { JSHandle } from "playwright-core";

export type Size = { width: number; height: number };
export type Point = { x: number; y: number };
export type Rect = Size & Point;
export type Quad = [Point, Point, Point, Point];
export type URLMatch = string | RegExp | ((url: URL) => boolean);
export type TimeoutOptions = { timeout?: number };
export type NameValue = { name: string; value: string };
export type HeadersArray = NameValue[];

export type StrictOptions = {
  strict?: boolean;
};

export type BrowserContextPauseParams = {};
export type BrowserContextPauseResult = void;
export type QueryOnSelectorOptions = StrictOptions & TimeoutOptions;

export type WaitForElementOptions = TimeoutOptions &
  StrictOptions & { state?: "attached" | "detached" | "visible" | "hidden" };

export type RecordHarOptions = {
  path: string;
  content?: "embed" | "attach" | "omit";
  mode?: "full" | "minimal";
  urlGlob?: string;
  urlRegexSource?: string;
  urlRegexFlags?: string;
};

export type SetNetworkCookie = {
  name: string;
  value: string;
  url?: string;
  domain?: string;
  path?: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
};

export type NetworkCookie = {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "Strict" | "Lax" | "None";
};

export type BrowserTypeLaunchPersistentContextParams = {
  channel?: string;
  executablePath?: string;
  args?: string[];
  ignoreAllDefaultArgs?: boolean;
  ignoreDefaultArgs?: string[];
  handleSIGINT?: boolean;
  handleSIGTERM?: boolean;
  handleSIGHUP?: boolean;
  timeout?: number;
  env?: NameValue[];
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
  extraHTTPHeaders?: NameValue[];
  offline?: boolean;
  httpCredentials?: {
    username: string;
    password: string;
  };
  deviceScaleFactor?: number;
  isMobile?: boolean;
  hasTouch?: boolean;
  colorScheme?: "dark" | "light" | "no-preference";
  reducedMotion?: "reduce" | "no-preference";
  forcedColors?: "active" | "none";
  acceptDownloads?: boolean;
  baseURL?: string;
  recordVideo?: {
    dir: string;
    size?: {
      width: number;
      height: number;
    };
  };
  recordHar?: RecordHarOptions;
  strictSelectors?: boolean;
  serviceWorkers?: "allow" | "block";
  userDataDir: string;
  slowMo?: number;
};

export type Credentials = {
  username: string;
  password: string;
};

export type Geolocation = {
  longitude: number;
  latitude: number;
  accuracy?: number;
};

export interface MetaData {
  id: string;
  wallTime: number;
  startTime: number;
  endTime: number;
  type: string;
  method: string;
  params: object;
  log: string[];
  snapshots: string[];
  isServerSide: boolean;
}

export type RouteFulfillParams = {
  status?: number;
  headers?: NameValue[];
  body?: string;
  isBase64?: boolean;
  fetchResponseUid?: string;
};

export type FilePayload = {
  name: string;
  mimeType: string;
  buffer: string;
};

export type World = "main" | "utility";

export type LifecycleEvent =
  | "load"
  | "domcontentloaded"
  | "networkidle"
  | "commit";

export type NavigateOptions = TimeoutOptions & {
  waitUntil?: LifecycleEvent;
};

export type GotoOptions = NavigateOptions & {
  referer?: string;
};

export type GotoResult = {
  newDocumentId?: string;
};

export type FunctionWithSource = (
  // eslint-disable-next-line no-use-before-define
  source: { context: BrowserContext; page: Page; frame: Frame },
  ...args: any
) => any;

export interface PageBinding {
  readonly name: string;
  readonly playwrightFunction: FunctionWithSource;
  readonly source: string;
  readonly needsHandle: boolean;
}

export type NormalizedContinueOverrides = {
  url?: string;
  method?: string;
  headers?: HeadersArray;
  postData?: Buffer;
};

export type ResourceTiming = {
  startTime: number;
  domainLookupStart: number;
  domainLookupEnd: number;
  connectStart: number;
  secureConnectionStart: number;
  connectEnd: number;
  requestStart: number;
  responseStart: number;
};

export type ResourceSizes = {
  requestBodySize: number;
  requestHeadersSize: number;
  responseBodySize: number;
  responseHeadersSize: number;
};

export type RemoteAddr = {
  ipAddress: string;
  port: number;
};

export type SecurityDetails = {
  protocol?: string;
  subjectName?: string;
  issuer?: string;
  validFrom?: number;
  validTo?: number;
};

export interface Request {
  url(): string;

  resourceType(): string;

  method(): string;

  postDataBuffer(): Buffer | null;

  headers(): HeadersArray;

  headerValue(name: string): string | undefined;

  // "null" means no raw headers available - we'll use provisional headers as raw headers.
  setRawRequestHeaders(headers: HeadersArray | null);

  rawRequestHeaders(): Promise<NameValue[]>;

  response(): PromiseLike<Response | null>;

  frame(): Frame | null;

  // serviceWorker(): pages.Worker | null;

  isNavigationRequest(): boolean;

  redirectedFrom(): Request | null;

  failure(): { errorText: string } | null;

  bodySize(): number;

  requestHeadersSize(): Promise<number>;
}

export interface Response {
  url(): string;
  status(): number;
  statusText(): string;
  headers(): HeadersArray;
  headerValue(name: string): string | undefined;
  rawResponseHeaders(): Promise<NameValue[]>;
  setWillReceiveExtraHeaders(): void;
  setRawResponseHeaders(headers: HeadersArray): void;
  timing(): ResourceTiming;
  serverAddr(): Promise<RemoteAddr | null>;
  securityDetails(): Promise<SecurityDetails | null>;
  body(): Promise<Buffer>;
  request(): Request;
  frame(): Frame;
  httpVersion(): "HTTP/1.1" | "HTTP/2.0" | string;
  sizes(): Promise<ResourceSizes>;
}

export interface Route {
  request(): Request;
  abort(errorCode?: string): Promise<void>;
  fulfill(overrides: RouteFulfillParams): Promise<void>;
  continue(overrides?: NormalizedContinueOverrides): Promise<void>;
}

export type RouteHandler = (route: Route, request: Request) => void;

type DocumentInfo = {
  // Unfortunately, we don't have documentId when we find out about
  // a pending navigation from things like frameScheduledNavigaiton.
  documentId: string | undefined;
  request: Request | undefined;
};

// https://github.com/microsoft/playwright/blob/4bec6309df2c45ecbbb2767201a98f89f1cf8f5e/packages/playwright-core/src/server/frames.ts#L467
export interface Frame {
  isDetached(): boolean;
  setPendingDocument(documentInfo: DocumentInfo | undefined): void;
  extendInjectedScript(source: string, arg?: any): Promise<void>;
  pendingDocument(): DocumentInfo | undefined;
  goto(
    metadata: MetaData,
    url: string,
    options?: GotoOptions
  ): Promise<Response | null>;
  evaluateExpression(
    expression: string,
    isFunction: boolean | undefined,
    arg: any,
    world?: World
  ): Promise<any>;
  waitForSelector(
    metadata: MetaData,
    selector: string,
    options: WaitForElementOptions & { omitReturnValue?: boolean },
    scope?: ElementHandle
  ): Promise<ElementHandle<Element> | null>;
  name(): string;
  url(): string;
  parentFrame(): Frame | null;
  childFrames(): Frame[];
  title(): Promise<string>;
}

export type KeyboardModifier = "Alt" | "Control" | "Meta" | "Shift";
export type MouseButton = "left" | "right" | "middle";

export interface RawKeyboard {
  keydown(
    modifiers: Set<KeyboardModifier>,
    code: string,
    keyCode: number,
    keyCodeWithoutLocation: number,
    key: string,
    location: number,
    autoRepeat: boolean,
    text: string | undefined
  ): Promise<void>;
  keyup(
    modifiers: Set<KeyboardModifier>,
    code: string,
    keyCode: number,
    keyCodeWithoutLocation: number,
    key: string,
    location: number
  ): Promise<void>;
  sendText(text: string): Promise<void>;
}

export interface RawMouse {
  move(
    x: number,
    y: number,
    button: MouseButton | "none",
    buttons: Set<MouseButton>,
    modifiers: Set<KeyboardModifier>,
    forClick: boolean
  ): Promise<void>;
  down(
    x: number,
    y: number,
    button: MouseButton,
    buttons: Set<MouseButton>,
    modifiers: Set<KeyboardModifier>,
    clickCount: number
  ): Promise<void>;
  up(
    x: number,
    y: number,
    button: MouseButton,
    buttons: Set<MouseButton>,
    modifiers: Set<KeyboardModifier>,
    clickCount: number
  ): Promise<void>;
  wheel(
    x: number,
    y: number,
    buttons: Set<MouseButton>,
    modifiers: Set<KeyboardModifier>,
    deltaX: number,
    deltaY: number
  ): Promise<void>;
}

export interface RawTouchscreen {
  tap(x: number, y: number, modifiers: Set<KeyboardModifier>): Promise<void>;
}

// https://github.com/microsoft/playwright/blob/5ae2017a5be9d465c7777170b8c62b1a71a504bc/packages/playwright-core/src/server/dom.ts
export interface ElementHandle<T extends Node = Node>
  extends Omit<JSHandle<T>, "asElement"> {
  asElement(): ElementHandle<T> | null;
  ownerFrame(): Promise<Frame | null>;
}

export interface PageDelegate {
  readonly rawMouse: RawMouse;
  readonly rawKeyboard: RawKeyboard;
  readonly rawTouchscreen: RawTouchscreen;

  reload(): Promise<void>;
  goBack(): Promise<boolean>;
  goForward(): Promise<boolean>;
  exposeBinding(binding: PageBinding): Promise<void>;
  removeExposedBindings(): Promise<void>;
  addInitScript(source: string): Promise<void>;
  removeInitScripts(): Promise<void>;
  closePage(runBeforeUnload: boolean): Promise<void>;
  potentiallyUninitializedPage(): Page;
  pageOrError(): Promise<Page | Error>;

  navigateFrame(
    frame: Frame,
    url: string,
    referrer: string | undefined
  ): Promise<GotoResult>;

  updateExtraHTTPHeaders(): Promise<void>;
  updateEmulatedViewportSize(): Promise<void>;
  updateEmulateMedia(): Promise<void>;
  updateRequestInterception(): Promise<void>;
  updateFileChooserInterception(): Promise<void>;
  bringToFront(): Promise<void>;

  setBackgroundColor(color?: {
    r: number;
    g: number;
    b: number;
    a: number;
  }): Promise<void>;
  takeScreenshot(
    progress: any,
    format: string,
    documentRect: Rect | undefined,
    viewportRect: Rect | undefined,
    quality: number | undefined,
    fitsViewport: boolean,
    scale: "css" | "device"
  ): Promise<Buffer>;

  isElementHandle(remoteObject: any): boolean;
  adoptElementHandle<T extends Node>(
    handle: ElementHandle<T>,
    to: any
  ): Promise<ElementHandle<T>>;
  getContentFrame(handle: ElementHandle): Promise<Frame | null>; // Only called for frame owner elements.
  getOwnerFrame(handle: ElementHandle): Promise<string | null>; // Returns frameId.
  getContentQuads(handle: ElementHandle): Promise<Quad[] | null>;
  setInputFiles(
    handle: ElementHandle<HTMLInputElement>,
    files: FilePayload[]
  ): Promise<void>;
  setInputFilePaths(
    handle: ElementHandle<HTMLInputElement>,
    files: string[]
  ): Promise<void>;
  getBoundingBox(handle: ElementHandle): Promise<Rect | null>;
  getFrameElement(frame: Frame): Promise<ElementHandle>;
  scrollRectIntoViewIfNeeded(
    handle: ElementHandle,
    rect?: Rect
  ): Promise<"error:notvisible" | "error:notconnected" | "done">;
  setScreencastOptions(
    options: { width: number; height: number; quality: number } | null
  ): Promise<void>;

  getAccessibilityTree(needle?: ElementHandle): Promise<{
    tree: any;
    needle: any | null;
  }>;
  pdf?: (options: any) => Promise<Buffer>;
  coverage?: () => any;

  // Work around WebKit's raf issues on Windows.
  rafCountForStablePosition(): number;
  // Work around Chrome's non-associated input and protocol.
  inputActionEpilogue(): Promise<void>;
  // Work around for asynchronously dispatched CSP errors in Firefox.
  readonly cspErrorsAsynchronousForInlineScipts?: boolean;
}

// https://github.com/microsoft/playwright/blob/5ae2017a5be9d465c7777170b8c62b1a71a504bc/packages/playwright-core/src/server/page.ts
export interface Page {
  context(): BrowserContext;
  opener(): Page | undefined;
  mainFrame(): Frame;
  frames(): Frame[];
  exposeBinding(
    name: string,
    needsHandle: boolean,
    playwrightBinding: FunctionWithSource
  ): Promise<void>;
  removeExposedBindings(): Promise<void>;
  setExtraHTTPHeaders(headers: HeadersArray): void;
  setViewportSize(viewportSize: Size): Promise<void>;
  viewportSize(): Size;
  bringToFront(): Promise<void>;
  addInitScript(source: string): Promise<void>;
  removeInitScripts(): Promise<void>;
  setClientRequestInterceptor(handler: RouteHandler | undefined): Promise<void>;
  _setServerRequestInterceptor(handler: RouteHandler): Promise<void>;
  close(
    metadata: MetaData,
    options?: { runBeforeUnload?: boolean }
  ): Promise<void>;
  isClosed(): boolean;
  setFileChooserIntercepted(enabled: boolean): Promise<void>;
  fileChooserIntercepted(): boolean;
}

export interface BrowserContext {
  emit(eventName: string, ...args: any[]): void;
  newPage(meta: MetaData): Promise<Page>;
  extendInjectedScript(source: string, arg?: object): Promise<void>;
  addInitScript(script: string): Promise<void>;
  pages(): Page[];
  newPageDelegate(): Promise<PageDelegate>;
  exposeBinding(
    name: string,
    needsHandle: boolean,
    playwrightBinding: FunctionWithSource
  ): Promise<void>;
  addCookies(cookies: SetNetworkCookie[]): Promise<void>;
  clearCookies(): Promise<void>;
  setGeolocation(geolocation?: Geolocation): Promise<void>;
  setExtraHTTPHeaders(headers: HeadersArray): Promise<void>;
  setOffline(offline: boolean): Promise<void>;
  cancelDownload(uuid: string): Promise<void>;
  doGetCookies(urls: string[]): Promise<NetworkCookie[]>;
  doGrantPermissions(origin: string, permissions: string[]): Promise<void>;
  doClearPermissions(): Promise<void>;
  doSetHTTPCredentials(httpCredentials?: Credentials): Promise<void>;
  doAddInitScript(expression: string): Promise<void>;
  doRemoveInitScripts(): Promise<void>;
  doExposeBinding(binding: PageBinding): Promise<void>;
  doRemoveExposedBindings(): Promise<void>;
  doUpdateRequestInterception(): Promise<void>;
  close(metadata: MetaData): Promise<void>;
  doClose(): Promise<void>;
  onClosePersistent(): void;
  on(eventName: string, callback: (...args: any[]) => void): void;
  pause(
    params?: BrowserContextPauseParams,
    metadata?: MetaData
  ): Promise<BrowserContextPauseResult>;
}

export interface WindowBounds {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

export class FrameSession {
  private _client: any;

  private _windowId: number;

  constructor(_client: any) {
    this._client = _client;
  }

  async init() {
    if (this._windowId) return;
    const { windowId } = await this._client.send("Browser.getWindowForTarget");
    this._windowId = windowId;
  }

  async setWindowBounds(bounds: WindowBounds) {
    if (!this._windowId) return;
    await this._client.send("Browser.setWindowBounds", {
      windowId: this._windowId,
      bounds,
    });
  }
}

export function serverSideCallMetadata() {
  return {
    id: "",
    wallTime: 0,
    startTime: 0,
    endTime: 0,
    type: "Internal",
    method: "",
    params: {},
    log: [],
    snapshots: [],
    isServerSide: true,
  };
}

export function mainFrameSession(page: Page): FrameSession {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new FrameSession(page._delegate._mainFrameSession._client);
}

export function crPage(page: Page): PageDelegate {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return page._delegate;
}
