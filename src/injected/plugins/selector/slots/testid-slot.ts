/**
 * 用来实现[data-testid]选择
 * @param node
 * @returns
 */
export default function testIDSlot(node: Element) {
  const testNode = node.closest('[data-testid]') as HTMLElement;
  if (testNode) {
    const selector = `[data-testid="${testNode.dataset.testid}"]`;
    const index = Array.from(document.querySelectorAll(selector)).findIndex(
      v => v === testNode,
    );
    return {
      selector,
      elements: [testNode],
      data: index,
    };
  }
  return null;
}
