import { genInjectID } from '@/core';
import { IBrowser, IPage } from './browser';

export interface ICodeGen {
  start(url: string): Promise<void>;
  isStart(): boolean;
  getBrowser(): IBrowser | null;
  getPage(): IPage | null;
  getAppPage(): IPage | null;
}

export const ICodeGen = genInjectID<ICodeGen>();

export default ICodeGen;
