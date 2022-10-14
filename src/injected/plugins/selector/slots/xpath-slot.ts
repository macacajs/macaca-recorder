/**
 * 获取element的xpath，优先取用id
 * @param ele
 */
function createXPathFromElement(ele): string {
  let elm = ele;
  const allNodes = document.getElementsByTagName('*');
  const segs: string[] = [];
  while (elm && elm.nodeType === 1) {
    if (elm.hasAttribute('id')) {
      let uniqueIdCount = 0;
      for (let n = 0; n < allNodes.length; n++) {
        if (allNodes[n].hasAttribute('id') && allNodes[n].id === elm.id)
          uniqueIdCount += 1;
        if (uniqueIdCount > 1) break;
      }
      if (uniqueIdCount === 1) {
        segs.unshift(`id("${elm.getAttribute('id')}")`);
        return segs.join('/');
      }
      segs.unshift(
        `${elm.localName.toLowerCase()}[@id="${elm.getAttribute('id')}"]`,
      );
    } else if (elm.hasAttribute('class')) {
      segs.unshift(
        `${elm.localName.toLowerCase()}[@class="${elm.getAttribute('class')}"]`,
      );
    } else {
      let i = 1;
      let sib = elm.previousSibling;
      while (sib) {
        if (sib.localName === elm.localName) {
          i++;
        }
        sib = sib.previousSibling;
      }
      segs.unshift(`${elm.localName.toLowerCase()}[${i}]`);
    }
    elm = elm.parentNode;
  }
  return segs.length ? `/${segs.join('/')}` : '';
}

export default function xpathSlot(node: Element) {
  const selector = createXPathFromElement(node);
  return {
    selector, // xpath
    elements: [node],
  };
}
