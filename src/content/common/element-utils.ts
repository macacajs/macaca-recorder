'use strict';

import {
  ATTRIBUTE_NAMES_CONFIG,
  MACACA_RECORDER_CONTAINER_TOOLTIP,
} from '@/constants';

/**
 * 根据 xpath 获取所有元素
 * @param {string} xpath - XPath表达式
 */
const evaluate = (xpath) => {
  const elements = [];
  try {
    const allParagraphs = document?.evaluate(
      xpath,
      document,
      null,
      XPathResult.ANY_TYPE,
      null,
    );
    let currentParagraph = allParagraphs.iterateNext() as HTMLElement;
    while (currentParagraph) {
      const style = window.getComputedStyle(currentParagraph);
      const rect = (currentParagraph).getBoundingClientRect();
      if (style.display === 'none' || style.visibility === 'hidden' || rect.height === 0 || rect.width === 0) {
        // ignore
      } else {
        elements.push(currentParagraph);
      }
      currentParagraph = allParagraphs.iterateNext() as HTMLElement;
    }
  } catch (error) {
    console.error('fastxpath evaluate error: ', error);
  }
  return elements;
};

/**
 * 获取所有 xpath
 * @param {Object} element - 元素
 */
const getElementXPath = (element) => {
  if (!element) return {};
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
  ATTRIBUTE_NAMES_CONFIG.forEach((key) => {
    const attribute = element.getAttribute(key);
    if (attribute) {
      // svg 特殊处理
      let xpath = `//${tagName}[@${key}="${attribute}"]`;
      xpath = xpath.replace('//svg', '//*').replace('//path', '//*');

      xpaths.push({
        xpath,
        key,
        tag: tagName,
      });
    }
  });

  const path = [];
  // 相对路径
  while (element.nodeType === Node.ELEMENT_NODE) {
    tagName = element.tagName.toLowerCase();
    let selector = tagName;
    if (element.getAttribute(ATTRIBUTE_NAMES_CONFIG[0])) {
      selector += `[@${ATTRIBUTE_NAMES_CONFIG[0]}="${element.getAttribute(ATTRIBUTE_NAMES_CONFIG[0])}"]`;
      path.unshift(selector);
      break;
    } else if (element.getAttribute(ATTRIBUTE_NAMES_CONFIG[1])) {
      selector += `[@${ATTRIBUTE_NAMES_CONFIG[1]}="${element.getAttribute(ATTRIBUTE_NAMES_CONFIG[1])}"]`;
      path.unshift(selector);
      break;
    } else if (element.getAttribute(ATTRIBUTE_NAMES_CONFIG[2])) {
      selector += `[@${ATTRIBUTE_NAMES_CONFIG[2]}="${element.getAttribute(ATTRIBUTE_NAMES_CONFIG[2])}"]`;
      path.unshift(selector);
      break;
    } else if (element.getAttribute(ATTRIBUTE_NAMES_CONFIG[3])) {
      selector += `[@${ATTRIBUTE_NAMES_CONFIG[3]}="${element.getAttribute(ATTRIBUTE_NAMES_CONFIG[3])}"]`;
      path.unshift(selector);
      break;
    } else {
      let index = 1;
      let sibling = element.previousSibling;
      while (sibling) {
        if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName.toLowerCase() === selector) {
          index += 1;
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
      /* eslint-disable no-param-reassign */
      element = element.parentNode;
    }
  }
  // svg 特殊处理
  let xpath = path.length ? `//${path.join('/')}` : null;
  [xpath] = xpath
    .replace('//svg', '//*')
    .replace('//path', '//*')
    .split('/svg');

  xpaths.push({
    xpath,
    key: '',
    tag: tagName,
  });
  // 去重
  const uniqueArr = xpaths.reduce((acc, cur) => {
    const isExist = acc.find((item) => item.xpath === cur.xpath);
    if (!isExist) {
      acc.push(cur);
    } else {
      Object.keys(cur).forEach((xp) => {
        isExist[xp] = cur[xp];
      });
    }
    return acc;
  }, []);
  return uniqueArr;
};

/**
 * 获取元素选择器
 * @param {Object} element - 元素
 */
export const getElementSelector = (element) => {
  if (!element) return {};
  const selectors = [];
  const xpaths = getElementXPath(element);
  xpaths.forEach((item) => {
    const elements = evaluate(item.xpath);
    // 获取失败，直接返回
    if (elements.length) {
      const index = elements.indexOf(element);
      if (item.key) {
        selectors.push({
          length: elements.length,
          index,
          ...item,
        });
      } else {
        selectors.push({
          length: elements.length,
          index: index === -1 ? 0 : index,
          ...item,
        });
      }
    }
  });
  return {
    selectors,
  };
};

/**
 * 清除元素状态
 * @param {object} element - 元素
 * @param {string} backgroundColor - 元素背景色
 */
export const resetStyle = (element, backgroundColor) => {
  element.style.setProperty('background-color', backgroundColor);
};

/**
 * 设置元素样式
 * @param {*} element - 元素
 * @param {*} backgroundColor - 元素背景色
 */
export const setStyle = (element, backgroundColor) => {
  element.style.setProperty('background-color', backgroundColor);
};

/**
 * 获取元素相对坐标
 * @param {*} element - 元素
 * @return {Object} 元素坐标信息
 */
export const getElementOffset = (element) => {
  const rect = element.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
  const top = rect.top + scrollTop;
  const left = rect.left + scrollLeft;
  const pageWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;
  return {
    left, top, width: rect.width, height: rect.height, pageWidth,
  };
};

/**
 * 渲染 Tooltip 组件
 * @param {Object} rect - 相对坐标
 * @param {Object} selectors - selectors 选择器
 */
export const renderTooltip = (rect, selectors) => {
  const tooltip = document.getElementById(MACACA_RECORDER_CONTAINER_TOOLTIP);
  if (tooltip) {
    let tooltipHtml = '';
    selectors.selectors.forEach((item) => {
      tooltipHtml += `<span id="${MACACA_RECORDER_CONTAINER_TOOLTIP}-selector" style="margin: 5px">[${item.index + 1}/${item.length}] ${item.xpath}</span><br>`;
    });
    tooltip.innerHTML = tooltipHtml;
    tooltip.style.display = 'block';
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.width + rect.left > rect.pageWidth) {
      tooltip.style.left = `${rect.left + rect.width - tooltipRect.width}px`;
    } else {
      tooltip.style.left = `${rect.left}px`;
    }
    tooltip.style.top = `${rect.top + rect.height + 5}px`;
  }
};

/**
 * 清除 tooltip 样式
 * @param element
 * @param backgroundColor
 */
export const cleanTooltip = (element, backgroundColor) => {
  if (element) resetStyle(element, backgroundColor);
  const tooltip = document.getElementById(MACACA_RECORDER_CONTAINER_TOOLTIP);
  tooltip.style.display = 'none';
};
