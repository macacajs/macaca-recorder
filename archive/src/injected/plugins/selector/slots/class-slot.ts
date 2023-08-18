function isOwnSelector(target: Element, selector: string) {
  const rets = target.ownerDocument.querySelectorAll(selector);
  return rets.length === 1 && rets[0] === target;
}

export default function classSlot(node: Element) {
  if (node.className) {
    const selector = `${node.tagName.toLowerCase()}.${node.className
      .split(/\s+/g)
      .join('.')}`;
    if (isOwnSelector(node, selector)) {
      return {
        selector,
        elements: [node],
      };
    }
  }
  return null;
}
