import { genInjectID, IEvent } from '@/core';
import { Action } from '@/types/actions';

export interface IActions {
  onActionChange: IEvent<Action>;
  getActions(): Action[];
}

export const IActions = genInjectID<IActions>();

export default IActions;
