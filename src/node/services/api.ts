import { genInjectID, IEventManager, InjectIDType } from '@/core';
import { ICodeGen } from './code-gen';

// 对外暴露api
export interface IApi {
  eventManger: IEventManager;
  codeGen: ICodeGen;
  init(): Promise<void>;
  getService<T extends object>(id: InjectIDType<T>): T | null;
  dispose(): Promise<void>;
}

export const IApi = genInjectID<IApi>();

export default IApi;
