import { genInjectID, IEvent } from '@/core';
import { Action } from '@/types/actions';

export interface IActions {
  onActionChange: IEvent<void>;
  getActions(): Action[];
  getCode(): string;
}

export const IActions = genInjectID<IActions>();

export default IActions;
