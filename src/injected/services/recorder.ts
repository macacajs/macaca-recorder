import { genInjectID } from '@/core';
import { Action } from '@/types/actions';
import ISelector from './selector';

export interface IRecorderContext {
  dom: HTMLElement;
  selector: ISelector;
  modifiersForEvent(event: MouseEvent | KeyboardEvent): number;
  buttonForEvent(event: MouseEvent): 'left' | 'middle' | 'right';
  positionForEvent(event: MouseEvent): { x: number; y: number } | undefined;
  addAction(action: Action): void;
}

export type RecorderSlot<T = any> = (
  type: string,
  event: T,
  context: IRecorderContext,
) => boolean;

export interface IRecorder {
  registerSlot(slot: RecorderSlot | RecorderSlot[]): void;
}

export const IRecorder = genInjectID<IRecorder>();

export default IRecorder;
