import { genInjectID } from '@/core';

/**
 * 选择器生成插件，根据输入的dom节点，返回适当的选择器
 * 可以返回null则表示交给下一个生成插件
 */
export type SelectorSlot = (
  node: Element,
) => null | { selector: string; elements: Element[]; data?: any };

/**
 * 选择器生成接口
 * 根据指定的dom生成对应的选择器
 */
export interface ISelector {
  /**
   * 提供的默认选择器
   */
  defaultSlots: {
    readonly easySlot: SelectorSlot;
    readonly idSlot: SelectorSlot;
    readonly classSlot: SelectorSlot;
    readonly testidSlot: SelectorSlot;
    readonly xpathSlot: SelectorSlot;
  };

  /**
   * 根据指定的html节点生成对应的选择器，会按照slot的优先顺序进行执行，可以通过{@link ISelector.registerSlot}进行注册
   * 如果所有@{@link SelectorSlot:slot}都未生成,则会运行兜底的生成逻辑
   * @param node 输入的节点
   * @param strict
   */
  generateSelector(
    node: Element,
    strict?: boolean,
  ): { selector: string; elements: Element[]; data?: any };

  /**
   *注册选择器生成插件,会按照优先级进行生成， 影响{@link ISelector.generateSelector}的生成结果
   * @param slot 根据dom生成选择器 支持数组 see {@link SelectorSlot}
   */
  registerSlot(slot: SelectorSlot | SelectorSlot[]): void;
}

export const ISelector = genInjectID<ISelector>();

export default ISelector;
