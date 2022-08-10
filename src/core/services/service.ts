import { CLAZZ, genInjectID, InjectIDType } from '../ioc';

export interface IServiceManager {
  registerServiceBean<T>(id: InjectIDType<T>, srv: T): void;
  registerService<T>(id: InjectIDType<T>, srv: CLAZZ<T>): void;
  getService<T extends object>(id: InjectIDType<T>): T | null;
}

export const IServiceManager = genInjectID<IServiceManager>();

export default IServiceManager;
