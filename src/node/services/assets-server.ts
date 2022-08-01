import { genInjectID } from '@/core';

export interface IAssetsServer {
  start(host: string, port: number, assetsDir: string): Promise<void>;
  stop(): Promise<void>;
}

export const iassetsServerID = genInjectID<IAssetsServer>();

export default iassetsServerID;
