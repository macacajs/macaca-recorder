import { genInjectID } from '@/core';
import { Action } from '@/types/actions';
import ISelector from './selector';

/**
 * 事件帮助对象
 * --------
 * 1. {@link IRecorderContext.dom| dom} 当前事件的dom元素
 * 2. {@link IRecorderContext.selector| selector} 选择生成器 see {@link ISelector.defaultSlots| ISelector}
 * 3. {@link IRecorderContext.modifiersForEvent| modifiersForEvent} 根据输入的事件 将（ctrl/option/cmd/shift)生成hash
 * 4. {@link IRecorderContext.buttonForEvent| buttonForEvent} 用于鼠标事件，返回点击的按键
 * 5. {@link IRecorderContext.positionForEvent| positionForEvent} 用于鼠标事件，返回当前距离body左上角的位置
 * 6. {@link IRecorderContext.addAction| addAction} 生成{@link Action}发送给recorder页面
 */
export interface IRecorderContext {
  dom: HTMLElement;
  selector: ISelector;
  modifiersForEvent(event: MouseEvent | KeyboardEvent): number;
  buttonForEvent(event: MouseEvent): 'left' | 'middle' | 'right';
  positionForEvent(event: MouseEvent): { x: number; y: number } | undefined;
  addAction(action: Action): void;
}

/**
 * 事件转化成Action插件，生成的action会发生到Recorder界面
 * @param type 当前事件类型 mousedown click 等
 * @param event 当前事件对象
 * @param context see {@link IRecorderContext}
 */
export type RecorderSlot<T = any> = (
  type: string,
  event: T,
  context: IRecorderContext,
) => boolean;

/**
 * 根据事件生成对应的Action发送给recorder页面
 */
export interface IRecorder {
  /**
   * 提供的默认选择器
   */
  defaultSlots: {
    readonly click: RecorderSlot;
    readonly input: RecorderSlot;
    readonly keydown: RecorderSlot;
    readonly selectonSlot: RecorderSlot;
  };

  /**
   * 注册事件转化成Action插件, 按照注册顺序进行执行
   * @param slot 插件 支持数组 see {@link RecorderSlot}
   */
  registerSlot(slot: RecorderSlot | RecorderSlot[]): void;
}

export const IRecorder = genInjectID<IRecorder>();

export default IRecorder;
