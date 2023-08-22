'use strict';

import constants from '@/common/js/constants';
const { ATTRIBUTE_NAMES } = constants;


/**
 * 根据 xpath 获取所有元素
 */
const evaluate = (xpath) => {
  const elements = [];
  try {
    const allParagraphs = document?.evaluate(
      xpath,
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    );
    let currentParagraph = allParagraphs.iterateNext();
    while (currentParagraph) {
      const style = window.getComputedStyle(currentParagraph);
      const rect = currentParagraph.getBoundingClientRect();
      if (style.display === 'none' || style.visibility === 'hidden' || rect.height === 0 || rect.width === 0) {
      } else {
        elements.push(currentParagraph);
      }
      currentParagraph = allParagraphs.iterateNext();
    }
  } catch (error) {
    console.error('macaca-recorder evaluate error: ', error)
  }
  return elements;
};

/**
 * 获取所有 xpath
 * @param {*} element 
 * @returns 
 */
const getElementXPath = (element) => {
  if (!element) return;
  const xpaths = [];
  let tagName = element.tagName.toLowerCase();
  const text = element.firstChild?.nodeValue;

  // 指定 text 的 xpath
  if (text) {
    xpaths.push({
      xpath: `//*[text()="${text}"]`,
      key: 'text',
      value: text,
      tag: tagName,
    });
  } 

  // 指定属性的 xpath
  for (const key of ATTRIBUTE_NAMES) {
    const attribute = element.getAttribute(key);
    if (!attribute) continue;
    // svg 特殊处理
    let xpath = `//${tagName}[@${key}="${attribute}"]`;
    xpath = xpath.replace('//svg', '//*').replace('//path', '//*')

    xpaths.push({
      xpath: xpath,
      key: key,
      tag: tagName,
    });
  }

  let path = [];
  // 相对路径
  while (element.nodeType === Node.ELEMENT_NODE) {
    tagName = element.tagName.toLowerCase();
    let selector = tagName;
    if (element.getAttribute(ATTRIBUTE_NAMES[0])) {
      selector += `[@${ATTRIBUTE_NAMES[0]}="${element.getAttribute(ATTRIBUTE_NAMES[0])}"]`;
      path.unshift(selector);
      break;
    } else if (element.getAttribute(ATTRIBUTE_NAMES[1])) {
      selector += `[@${ATTRIBUTE_NAMES[1]}="${element.getAttribute(ATTRIBUTE_NAMES[1])}"]`;
      path.unshift(selector);
      break;
    } else if (element.getAttribute(ATTRIBUTE_NAMES[2])) {
      selector += `[@${ATTRIBUTE_NAMES[2]}="${element.getAttribute(ATTRIBUTE_NAMES[2])}"]`;
      path.unshift(selector);
      break;
    } else if (element.getAttribute(ATTRIBUTE_NAMES[3])) {
      selector += `[@${ATTRIBUTE_NAMES[3]}="${element.getAttribute(ATTRIBUTE_NAMES[3])}"]`;
      path.unshift(selector);
      break;
    } else {
      let index = 1;
      let sibling = element.previousSibling;
      while (sibling) {
        if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName.toLowerCase() === selector) {
          index++;
        }
        sibling = sibling.previousSibling;
      }
      if (index === 1) {
        // 如果元素没有兄弟节点，则直接返回标签选择器
        path.unshift(selector);
      } else {
        // 如果元素有兄弟节点，则添加索引
        selector += `[${index}]`;
        path.unshift(selector);
      }
      element = element.parentNode;
    }
  }
  // svg 特殊处理
  let xpath = path.length ? `//${path.join('/')}` : null;
  xpath = xpath.replace('//svg', '//*').replace('//path', '//*').split('/svg')[0];

  xpaths.push({
    xpath,
    key: '',
    tag: tagName,
  })

  const uniqueArr = xpaths.reduce((acc, cur) => {
    const isExist = acc.find(item => item.xpath === cur.xpath);
    if (!isExist) {
      acc.push(cur);
    } else {
      Object.keys(cur).forEach(xpath => {
        isExist[xpath] = cur[xpath];
      });
    }
    return acc;
  }, []);
  return uniqueArr;
}

/**
 * 获取元素选择器
 * @param {*} element 
 * @param {*} opts 
 * @returns 
 */
export const getElementSelector = (element, opts = {}) => {
  if (!element) return;
  const selectors = [];
  const xpaths = getElementXPath(element);
  for (const item of xpaths) {
    const elements = evaluate(item.xpath);
    // 获取失败，直接返回
    if (elements.length) {
      const index = elements.indexOf(element);
      if (item.key) {
        selectors.push({
          length: elements.length,
          index,
          ...item
        });
      } else {
        selectors.push({
          length: elements.length,
          index: index === -1 ? 0 : index,
          ...item
        });
      }
    }
  }
  return {
    selectors,
  };
};


/**
 * 清除元素状态
 */
export const resetStyle = (element, lastElementBackgroundColor) => {
  element.style.backgroundColor = lastElementBackgroundColor;
};

/**
 * 设置元素样式
 */
export const setStyle = (element, backgroundColor) => {
  element.style.backgroundColor = backgroundColor;
};

/**
 * 获取元素相对坐标
 */
export const getElementOffset = (element) => {
  const rect = element.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
  const top = rect.top + scrollTop;
  const left = rect.left + scrollLeft;
  const pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  return { left, top, width: rect.width, height: rect.height, pageWidth };
}