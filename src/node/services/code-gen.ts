import { genInjectID } from '@/core';

export interface ICodeGen {
  start(url: string): Promise<void>;
}

export const icodeGenID = genInjectID<ICodeGen>();

export default icodeGenID;
