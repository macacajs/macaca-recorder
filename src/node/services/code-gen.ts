import { genInjectID, IEvent } from '@/core';
import { IBrowser, IPage } from './browser';

export interface ICodeGen {
  start(url: string): Promise<void>;
  restartPage(): Promise<void>;
  isStart(): boolean;
  getBrowser(): IBrowser | null;
  getPage(): IPage | null;
  getAppPage(): IPage | null;

  // events
  afterBrowerLaunch: IEvent<IBrowser>;
  afterAppPageLaunch: IEvent<IPage>;
  afterPageLaunch: IEvent<IPage>;
  afterStart: IEvent<void>;
  beforeDispose: IEvent<void>;
}

export const ICodeGen = genInjectID<ICodeGen>();

export default ICodeGen;
