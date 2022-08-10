import { genInjectID } from '@/core';

export interface IWebServiceManager {
  addCoderPlugin(tsPath: string): void;
  addWebPlugin(tsPath: string): void;
}

export const IWebServiceManager = genInjectID<IWebServiceManager>();

export default IWebServiceManager;
