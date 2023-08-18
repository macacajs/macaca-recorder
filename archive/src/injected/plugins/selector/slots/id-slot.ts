function isOwnSelector(target: Element, selector: string) {
  const rets = target.ownerDocument.querySelectorAll(selector);
  return rets.length === 1 && rets[0] === target;
}

export default function IdSlot(node: Element) {
  const idSelector = `#${node.id}`;
  if (idSelector.length > 1 && isOwnSelector(node, idSelector)) {
    return {
      selector: idSelector,
      elements: [node],
    };
  }

  return null;
}
