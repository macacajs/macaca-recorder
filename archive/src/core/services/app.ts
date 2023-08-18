import { genInjectID } from '../ioc';

export interface IApp {
  init(): Promise<void>;
  dispose(): Promise<void>;
}

export const IApp = genInjectID<IApp>();

export default IApp;
