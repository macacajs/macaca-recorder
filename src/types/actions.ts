export type Point = { x: number; y: number };

export type ActionName =
  | 'check'
  | 'click'
  | 'closePage'
  | 'fill'
  | 'navigate'
  | 'openPage'
  | 'press'
  | 'select'
  | 'uncheck'
  | 'setInputFiles'
  | 'custom';

export type ActionBase = {
  name: ActionName;
  // eslint-disable-next-line no-use-before-define
  signals: Signal[];
};

export type ClickAction = ActionBase & {
  name: 'click';
  selector: string;
  button: 'left' | 'middle' | 'right';
  modifiers: number;
  clickCount: number;
  position?: Point;
};

export type CheckAction = ActionBase & {
  name: 'check';
  selector: string;
};

export type UncheckAction = ActionBase & {
  name: 'uncheck';
  selector: string;
};

export type FillAction = ActionBase & {
  name: 'fill';
  selector: string;
  text: string;
};

export type NavigateAction = ActionBase & {
  name: 'navigate';
  url: string;
};

export type OpenPageAction = ActionBase & {
  name: 'openPage';
  url: string;
};

export type ClosesPageAction = ActionBase & {
  name: 'closePage';
};

export type PressAction = ActionBase & {
  name: 'press';
  selector: string;
  key: string;
  modifiers: number;
};

export type SelectAction = ActionBase & {
  name: 'select';
  selector: string;
  options: string[];
};

export type SetInputFilesAction = ActionBase & {
  name: 'setInputFiles';
  selector: string;
  files: string[];
};

export type CustomAction = ActionBase & {
  name: 'custom';
  data: Record<string, unknown>;
};

export type Action =
  | ClickAction
  | CheckAction
  | ClosesPageAction
  | OpenPageAction
  | UncheckAction
  | FillAction
  | NavigateAction
  | PressAction
  | SelectAction
  | SetInputFilesAction
  | CustomAction;

// Signals.

export type BaseSignal = {
  name: string;
};

export type NavigationSignal = BaseSignal & {
  name: 'navigation';
  url: string;
};

export type PopupSignal = BaseSignal & {
  name: 'popup';
  popupAlias: string;
};

export type DownloadSignal = BaseSignal & {
  name: 'download';
  downloadAlias: string;
};

export type DialogSignal = BaseSignal & {
  name: 'dialog';
  dialogAlias: string;
};

export type Signal =
  | NavigationSignal
  | PopupSignal
  | DownloadSignal
  | DialogSignal;

export type FrameDescription = {
  pageAlias: string;
  isMainFrame: boolean;
  url: string;
  name?: string;
  selectorsChain?: string[];
};

export function actionTitle(action: Action): string {
  switch (action.name) {
    case 'openPage':
      return `Open new page`;
    case 'closePage':
      return `Close page`;
    case 'check':
      return `Check ${action.selector}`;
    case 'uncheck':
      return `Uncheck ${action.selector}`;
    case 'click': {
      if (action.clickCount === 1) return `Click ${action.selector}`;
      if (action.clickCount === 2) return `Double click ${action.selector}`;
      if (action.clickCount === 3) return `Triple click ${action.selector}`;
      return `${action.clickCount}× click`;
    }
    case 'fill':
      return `Fill ${action.selector}`;
    case 'setInputFiles':
      if (action.files.length === 0) return `Clear selected files`;
      return `Upload ${action.files.join(', ')}`;
    case 'navigate':
      return `Go to ${action.url}`;
    case 'press':
      return `Press ${action.key}${action.modifiers ? ' with modifiers' : ''}`;
    case 'select':
      return `Select ${action.options.join(', ')}`;

    default:
      return '';
  }
}
