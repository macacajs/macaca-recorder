/**
 * 用来实现[data-testid]选择
 * @param node
 * @returns
 */
export default function testIDSlot(node: Element) {
  const testNode = node.closest('[data-testid]') as HTMLElement;
  if (testNode) {
    return {
      selector: `[data-testid="${testNode.dataset.testid}"]`,
      elements: [testNode],
    };
  }
  return null;
}
