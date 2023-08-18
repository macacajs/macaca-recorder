// 通过xpath 获取元素
function getElementsByXpath(xpath: string) {
  const pEl = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ANY_TYPE,
    null,
  );
  const result: Node[] = [];
  let dom = pEl.iterateNext();
  while (dom) {
    result.push(dom);
    dom = pEl.iterateNext();
  }
  return result;
}

/**
 * 优先级从高到低
 * data-testid=xx
 * text=xx
 * placeholder=xx
 * class=xx 包含搜索（index）
 * @param node
 */
export default function easySlot(node: Element) {
  let selector = '';
  let index = 0;
  // data-testid
  const testNode = node.closest('[data-testid]') as HTMLElement;
  if (testNode && testNode.dataset.testid) {
    selector = `data-testid=${testNode.dataset.testid}`;
    index = Array.from(
      document.querySelectorAll(`[data-testid="${testNode.dataset.testid}"]`),
    ).findIndex(v => v === testNode);
    return {
      selector,
      elements: [node],
      data: index,
    };
  }
  // placeholder
  const placeholderVal = node.getAttribute('placeholder');
  if (placeholderVal) {
    selector = `placeholder=${placeholderVal}`;
    return {
      selector,
      elements: [node],
    };
  }
  // class标签
  const classVal = node.getAttribute('class');
  if (classVal) {
    const firstVal = classVal.split(' ')[0];
    // 去除结尾的随机字符 (如果有)
    const tarVal = firstVal.slice(0, firstVal.lastIndexOf('_'));
    selector = `class=${tarVal}`;
    index = Array.from(
      getElementsByXpath(`//*[contains(@class, "${tarVal}")]`),
    ).findIndex(v => v === node);
    return {
      selector,
      elements: [node],
      data: index || 0,
    };
  }
  return null;
}
