import { genInjectID } from '../ioc';

export interface IApp {
  init(): Promise<void>;
  dispose(): Promise<void>;
}

export const iappID = genInjectID<IApp>();

export default iappID;
