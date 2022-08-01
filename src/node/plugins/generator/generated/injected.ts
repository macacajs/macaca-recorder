/* eslint-disable */
"use strict";
export const source = "'use strict';\n\n/* eslint-disable */\n/**\n * Copyright (c) Microsoft Corporation.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\nclass Highlight {\n    constructor(isUnderTest) {\n        this._highlightEntries = [];\n        this._isUnderTest = isUnderTest;\n        this._glassPaneElement = document.createElement('x-pw-glass');\n        this._glassPaneElement.style.position = 'fixed';\n        this._glassPaneElement.style.top = '0';\n        this._glassPaneElement.style.right = '0';\n        this._glassPaneElement.style.bottom = '0';\n        this._glassPaneElement.style.left = '0';\n        this._glassPaneElement.style.zIndex = '2147483647';\n        this._glassPaneElement.style.pointerEvents = 'none';\n        this._glassPaneElement.style.display = 'flex';\n        this._actionPointElement = document.createElement('x-pw-action-point');\n        this._actionPointElement.setAttribute('hidden', 'true');\n        // Use a closed shadow root to prevent selectors matching our internal previews.\n        this._glassPaneShadow = this._glassPaneElement.attachShadow({\n            mode: isUnderTest ? 'open' : 'closed',\n        });\n        this._glassPaneShadow.appendChild(this._actionPointElement);\n        const styleElement = document.createElement('style');\n        styleElement.textContent = `\n        x-pw-tooltip {\n          align-items: center;\n          backdrop-filter: blur(5px);\n          background-color: rgba(0, 0, 0, 0.7);\n          border-radius: 2px;\n          box-shadow: rgba(0, 0, 0, 0.1) 0px 3.6px 3.7px,\n                      rgba(0, 0, 0, 0.15) 0px 12.1px 12.3px,\n                      rgba(0, 0, 0, 0.1) 0px -2px 4px,\n                      rgba(0, 0, 0, 0.15) 0px -12.1px 24px,\n                      rgba(0, 0, 0, 0.25) 0px 54px 55px;\n          color: rgb(204, 204, 204);\n          display: none;\n          font-family: 'Dank Mono', 'Operator Mono', Inconsolata, 'Fira Mono',\n                      'SF Mono', Monaco, 'Droid Sans Mono', 'Source Code Pro', monospace;\n          font-size: 12.8px;\n          font-weight: normal;\n          left: 0;\n          line-height: 1.5;\n          max-width: 600px;\n          padding: 3.2px 5.12px 3.2px;\n          position: absolute;\n          top: 0;\n        }\n        x-pw-action-point {\n          position: absolute;\n          width: 20px;\n          height: 20px;\n          background: red;\n          border-radius: 10px;\n          pointer-events: none;\n          margin: -10px 0 0 -10px;\n          z-index: 2;\n        }\n        *[hidden] {\n          display: none !important;\n        }\n    `;\n        this._glassPaneShadow.appendChild(styleElement);\n    }\n    install() {\n        document.documentElement.appendChild(this._glassPaneElement);\n    }\n    uninstall() {\n        this._glassPaneElement.remove();\n    }\n    isInstalled() {\n        return (this._glassPaneElement.parentElement === document.documentElement &&\n            !this._glassPaneElement.nextElementSibling);\n    }\n    showActionPoint(x, y) {\n        this._actionPointElement.style.top = `${y}px`;\n        this._actionPointElement.style.left = `${x}px`;\n        this._actionPointElement.hidden = false;\n        if (this._isUnderTest)\n            console.error(`Action point for test: ${JSON.stringify({ x, y })}`); // eslint-disable-line no-console\n    }\n    hideActionPoint() {\n        this._actionPointElement.hidden = true;\n    }\n    clearHighlight() {\n        var _a, _b;\n        for (const entry of this._highlightEntries) {\n            (_a = entry.highlightElement) === null || _a === void 0 ? void 0 : _a.remove();\n            (_b = entry.tooltipElement) === null || _b === void 0 ? void 0 : _b.remove();\n        }\n        this._highlightEntries = [];\n    }\n    updateHighlight(elements, selector, isRecording) {\n        let color;\n        if (isRecording)\n            color = '#dc6f6f7f';\n        else\n            color = elements.length > 1 ? '#f6b26b7f' : '#6fa8dc7f';\n        this._innerUpdateHighlight(elements, { color, tooltipText: selector });\n    }\n    maskElements(elements) {\n        this._innerUpdateHighlight(elements, { color: '#F0F' });\n    }\n    _innerUpdateHighlight(elements, options) {\n        // Code below should trigger one layout and leave with the\n        // destroyed layout.\n        if (this._highlightIsUpToDate(elements))\n            return;\n        // 1. Destroy the layout\n        this.clearHighlight();\n        for (let i = 0; i < elements.length; ++i) {\n            const highlightElement = this._createHighlightElement();\n            this._glassPaneShadow.appendChild(highlightElement);\n            let tooltipElement;\n            if (options.tooltipText) {\n                tooltipElement = document.createElement('x-pw-tooltip');\n                this._glassPaneShadow.appendChild(tooltipElement);\n                const suffix = elements.length > 1 ? ` [${i + 1} of ${elements.length}]` : '';\n                tooltipElement.textContent = options.tooltipText + suffix;\n                tooltipElement.style.top = '0';\n                tooltipElement.style.left = '0';\n                tooltipElement.style.display = 'flex';\n            }\n            this._highlightEntries.push({\n                targetElement: elements[i],\n                tooltipElement,\n                highlightElement,\n            });\n        }\n        // 2. Trigger layout while positioning tooltips and computing bounding boxes.\n        for (const entry of this._highlightEntries) {\n            entry.box = entry.targetElement.getBoundingClientRect();\n            if (!entry.tooltipElement)\n                continue;\n            // Position tooltip, if any.\n            const tooltipWidth = entry.tooltipElement.offsetWidth;\n            const tooltipHeight = entry.tooltipElement.offsetHeight;\n            const totalWidth = this._glassPaneElement.offsetWidth;\n            const totalHeight = this._glassPaneElement.offsetHeight;\n            let anchorLeft = entry.box.left;\n            if (anchorLeft + tooltipWidth > totalWidth - 5)\n                anchorLeft = totalWidth - tooltipWidth - 5;\n            let anchorTop = entry.box.bottom + 5;\n            if (anchorTop + tooltipHeight > totalHeight - 5) {\n                // If can't fit below, either position above...\n                if (entry.box.top > tooltipHeight + 5) {\n                    anchorTop = entry.box.top - tooltipHeight - 5;\n                }\n                else {\n                    // Or on top in case of large element\n                    anchorTop = totalHeight - 5 - tooltipHeight;\n                }\n            }\n            entry.tooltipTop = anchorTop;\n            entry.tooltipLeft = anchorLeft;\n        }\n        // 3. Destroy the layout again.\n        // If there are more than 1 box - we are evaluating a non-unique (potentially bad) selector.\n        for (const entry of this._highlightEntries) {\n            if (entry.tooltipElement) {\n                entry.tooltipElement.style.top = `${entry.tooltipTop}px`;\n                entry.tooltipElement.style.left = `${entry.tooltipLeft}px`;\n            }\n            const box = entry.box;\n            entry.highlightElement.style.backgroundColor = options.color;\n            entry.highlightElement.style.left = `${box.x}px`;\n            entry.highlightElement.style.top = `${box.y}px`;\n            entry.highlightElement.style.width = `${box.width}px`;\n            entry.highlightElement.style.height = `${box.height}px`;\n            entry.highlightElement.style.display = 'block';\n            if (this._isUnderTest)\n                console.error(`Highlight box for test: ${JSON.stringify({\n                    x: box.x,\n                    y: box.y,\n                    width: box.width,\n                    height: box.height,\n                })}`); // eslint-disable-line no-console\n        }\n    }\n    _highlightIsUpToDate(elements) {\n        if (elements.length !== this._highlightEntries.length)\n            return false;\n        for (let i = 0; i < this._highlightEntries.length; ++i) {\n            if (elements[i] !== this._highlightEntries[i].targetElement)\n                return false;\n            const oldBox = this._highlightEntries[i].box;\n            if (!oldBox)\n                return false;\n            const box = elements[i].getBoundingClientRect();\n            if (box.top !== oldBox.top ||\n                box.right !== oldBox.right ||\n                box.bottom !== oldBox.bottom ||\n                box.left !== oldBox.left)\n                return false;\n        }\n        return true;\n    }\n    _createHighlightElement() {\n        const highlightElement = document.createElement('x-pw-highlight');\n        highlightElement.style.position = 'absolute';\n        highlightElement.style.top = '0';\n        highlightElement.style.left = '0';\n        highlightElement.style.width = '0';\n        highlightElement.style.height = '0';\n        highlightElement.style.boxSizing = 'border-box';\n        return highlightElement;\n    }\n}\n\n/* eslint-disable */\nfunction shouldSkipForTextMatching(element) {\n    return (element.nodeName === 'SCRIPT' ||\n        element.nodeName === 'STYLE' ||\n        (document.head && document.head.contains(element)));\n}\nfunction elementText(cache, root) {\n    let value = cache.get(root);\n    if (value === undefined) {\n        value = { full: '', immediate: [] };\n        if (!shouldSkipForTextMatching(root)) {\n            let currentImmediate = '';\n            if (root instanceof HTMLInputElement &&\n                (root.type === 'submit' || root.type === 'button')) {\n                value = { full: root.value, immediate: [root.value] };\n            }\n            else {\n                for (let child = root.firstChild; child; child = child.nextSibling) {\n                    if (child.nodeType === Node.TEXT_NODE) {\n                        value.full += child.nodeValue || '';\n                        currentImmediate += child.nodeValue || '';\n                    }\n                    else {\n                        if (currentImmediate)\n                            value.immediate.push(currentImmediate);\n                        currentImmediate = '';\n                        if (child.nodeType === Node.ELEMENT_NODE)\n                            value.full += elementText(cache, child).full;\n                    }\n                }\n                if (currentImmediate)\n                    value.immediate.push(currentImmediate);\n                if (root.shadowRoot)\n                    value.full += elementText(cache, root.shadowRoot).full;\n            }\n        }\n        cache.set(root, value);\n    }\n    return value;\n}\n\n/* eslint-disable */\nconst cacheAllowText = new Map();\nconst cacheDisallowText = new Map();\nconst kNthScore = 1000;\nfunction generateSelector(injectedScript, targetElement, strict) {\n    injectedScript._evaluator.begin();\n    try {\n        targetElement = targetElement.closest('button,select,input,[role=button],[role=checkbox],[role=radio]') || targetElement;\n        const targetTokens = generateSelectorFor(injectedScript, targetElement, strict);\n        const bestTokens = targetTokens || cssFallback(injectedScript, targetElement, strict);\n        const selector = joinTokens(bestTokens);\n        const parsedSelector = injectedScript.parseSelector(selector);\n        return {\n            selector,\n            elements: injectedScript.querySelectorAll(parsedSelector, targetElement.ownerDocument)\n        };\n    }\n    finally {\n        cacheAllowText.clear();\n        cacheDisallowText.clear();\n        injectedScript._evaluator.end();\n    }\n}\nfunction filterRegexTokens(textCandidates) {\n    // Filter out regex-based selectors for better performance.\n    return textCandidates.filter(c => c[0].selector[0] !== '/');\n}\nfunction generateSelectorFor(injectedScript, targetElement, strict) {\n    if (targetElement.ownerDocument.documentElement === targetElement)\n        return [{ engine: 'css', selector: 'html', score: 1 }];\n    const calculate = (element, allowText) => {\n        const allowNthMatch = element === targetElement;\n        let textCandidates = allowText ? buildTextCandidates(injectedScript, element, element === targetElement).map(token => [token]) : [];\n        if (element !== targetElement) {\n            // Do not use regex for parent elements (for performance).\n            textCandidates = filterRegexTokens(textCandidates);\n        }\n        const noTextCandidates = buildCandidates(injectedScript, element).map(token => [token]);\n        // First check all text and non-text candidates for the element.\n        let result = chooseFirstSelector(injectedScript, targetElement.ownerDocument, element, [...textCandidates, ...noTextCandidates], allowNthMatch, strict);\n        // Do not use regex for chained selectors (for performance).\n        textCandidates = filterRegexTokens(textCandidates);\n        const checkWithText = (textCandidatesToUse) => {\n            // Use the deepest possible text selector - works pretty good and saves on compute time.\n            const allowParentText = allowText && !textCandidatesToUse.length;\n            const candidates = [...textCandidatesToUse, ...noTextCandidates].filter(c => {\n                if (!result)\n                    return true;\n                return combineScores(c) < combineScores(result);\n            });\n            // This is best theoretically possible candidate from the current parent.\n            // We use the fact that widening the scope to grand-parent makes any selector\n            // even less likely to match.\n            let bestPossibleInParent = candidates[0];\n            if (!bestPossibleInParent)\n                return;\n            for (let parent = parentElementOrShadowHost(element); parent; parent = parentElementOrShadowHost(parent)) {\n                const parentTokens = calculateCached(parent, allowParentText);\n                if (!parentTokens)\n                    continue;\n                // Even the best selector won't be too good - skip this parent.\n                if (result && combineScores([...parentTokens, ...bestPossibleInParent]) >= combineScores(result))\n                    continue;\n                // Update the best candidate that finds \"element\" in the \"parent\".\n                bestPossibleInParent = chooseFirstSelector(injectedScript, parent, element, candidates, allowNthMatch, strict);\n                if (!bestPossibleInParent)\n                    return;\n                const combined = [...parentTokens, ...bestPossibleInParent];\n                if (!result || combineScores(combined) < combineScores(result))\n                    result = combined;\n            }\n        };\n        checkWithText(textCandidates);\n        // Allow skipping text on the target element, and using text on one of the parents.\n        if (element === targetElement && textCandidates.length)\n            checkWithText([]);\n        return result;\n    };\n    const calculateCached = (element, allowText) => {\n        const cache = allowText ? cacheAllowText : cacheDisallowText;\n        let value = cache.get(element);\n        if (value === undefined) {\n            value = calculate(element, allowText);\n            cache.set(element, value);\n        }\n        return value;\n    };\n    return calculateCached(targetElement, true);\n}\nfunction buildCandidates(injectedScript, element) {\n    const candidates = [];\n    for (const attribute of ['data-testid', 'data-test-id', 'data-test']) {\n        if (element.getAttribute(attribute))\n            candidates.push({ engine: 'css', selector: `[${attribute}=${quoteAttributeValue(element.getAttribute(attribute))}]`, score: 1 });\n    }\n    if (element.nodeName === 'INPUT') {\n        const input = element;\n        if (input.placeholder)\n            candidates.push({ engine: 'css', selector: `[placeholder=${quoteAttributeValue(input.placeholder)}]`, score: 10 });\n    }\n    if (element.getAttribute('aria-label'))\n        candidates.push({ engine: 'css', selector: `[aria-label=${quoteAttributeValue(element.getAttribute('aria-label'))}]`, score: 10 });\n    if (element.getAttribute('alt') && ['APPLET', 'AREA', 'IMG', 'INPUT'].includes(element.nodeName))\n        candidates.push({ engine: 'css', selector: `${cssEscape(element.nodeName.toLowerCase())}[alt=${quoteAttributeValue(element.getAttribute('alt'))}]`, score: 10 });\n    if (element.getAttribute('role'))\n        candidates.push({ engine: 'css', selector: `${cssEscape(element.nodeName.toLowerCase())}[role=${quoteAttributeValue(element.getAttribute('role'))}]`, score: 50 });\n    if (element.getAttribute('name') && ['BUTTON', 'FORM', 'FIELDSET', 'FRAME', 'IFRAME', 'INPUT', 'KEYGEN', 'OBJECT', 'OUTPUT', 'SELECT', 'TEXTAREA', 'MAP', 'META', 'PARAM'].includes(element.nodeName))\n        candidates.push({ engine: 'css', selector: `${cssEscape(element.nodeName.toLowerCase())}[name=${quoteAttributeValue(element.getAttribute('name'))}]`, score: 50 });\n    if (['INPUT', 'TEXTAREA'].includes(element.nodeName) && element.getAttribute('type') !== 'hidden') {\n        if (element.getAttribute('type'))\n            candidates.push({ engine: 'css', selector: `${cssEscape(element.nodeName.toLowerCase())}[type=${quoteAttributeValue(element.getAttribute('type'))}]`, score: 50 });\n    }\n    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(element.nodeName))\n        candidates.push({ engine: 'css', selector: cssEscape(element.nodeName.toLowerCase()), score: 50 });\n    const idAttr = element.getAttribute('id');\n    if (idAttr && !isGuidLike(idAttr))\n        candidates.push({ engine: 'css', selector: makeSelectorForId(idAttr), score: 100 });\n    candidates.push({ engine: 'css', selector: cssEscape(element.nodeName.toLowerCase()), score: 200 });\n    return candidates;\n}\nfunction buildTextCandidates(injectedScript, element, allowHasText) {\n    if (element.nodeName === 'SELECT')\n        return [];\n    const text = elementText(injectedScript._evaluator._cacheText, element).full.trim().replace(/\\s+/g, ' ').substring(0, 80);\n    if (!text)\n        return [];\n    const candidates = [];\n    let escaped = text;\n    if (text.includes('\"') || text.includes('>>') || text[0] === '/')\n        escaped = `/.*${escapeForRegex(text)}.*/`;\n    candidates.push({ engine: 'text', selector: escaped, score: 10 });\n    if (allowHasText && escaped === text) {\n        let prefix = element.nodeName.toLowerCase();\n        if (element.hasAttribute('role'))\n            prefix += `[role=${quoteAttributeValue(element.getAttribute('role'))}]`;\n        candidates.push({ engine: 'css', selector: `${prefix}:has-text(\"${text}\")`, score: 30 });\n    }\n    return candidates;\n}\nfunction parentElementOrShadowHost(element) {\n    if (element.parentElement)\n        return element.parentElement;\n    if (!element.parentNode)\n        return null;\n    if (element.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE && element.parentNode.host)\n        return element.parentNode.host;\n    return null;\n}\nfunction makeSelectorForId(id) {\n    return /^[a-zA-Z][a-zA-Z0-9\\-\\_]+$/.test(id) ? '#' + id : `[id=\"${cssEscape(id)}\"]`;\n}\nfunction cssFallback(injectedScript, targetElement, strict) {\n    const kFallbackScore = 10000000;\n    const root = targetElement.ownerDocument;\n    const tokens = [];\n    function uniqueCSSSelector(prefix) {\n        const path = tokens.slice();\n        if (prefix)\n            path.unshift(prefix);\n        const selector = path.join(' > ');\n        const parsedSelector = injectedScript.parseSelector(selector);\n        const node = injectedScript.querySelector(parsedSelector, targetElement.ownerDocument, false);\n        return node === targetElement ? selector : undefined;\n    }\n    function makeStrict(selector) {\n        const token = { engine: 'css', selector, score: kFallbackScore };\n        if (!strict)\n            return [token];\n        const parsedSelector = injectedScript.parseSelector(selector);\n        const elements = injectedScript.querySelectorAll(parsedSelector, targetElement.ownerDocument);\n        if (elements.length === 1)\n            return [token];\n        const nth = { engine: 'nth', selector: String(elements.indexOf(targetElement)), score: kNthScore };\n        return [token, nth];\n    }\n    for (let element = targetElement; element && element !== root; element = parentElementOrShadowHost(element)) {\n        const nodeName = element.nodeName.toLowerCase();\n        // Element ID is the strongest signal, use it.\n        let bestTokenForLevel = '';\n        if (element.id) {\n            const token = makeSelectorForId(element.id);\n            const selector = uniqueCSSSelector(token);\n            if (selector)\n                return makeStrict(selector);\n            bestTokenForLevel = token;\n        }\n        const parent = element.parentNode;\n        // Combine class names until unique.\n        const classes = [...element.classList];\n        for (let i = 0; i < classes.length; ++i) {\n            const token = '.' + cssEscape(classes.slice(0, i + 1).join('.'));\n            const selector = uniqueCSSSelector(token);\n            if (selector)\n                return makeStrict(selector);\n            // Even if not unique, does this subset of classes uniquely identify node as a child?\n            if (!bestTokenForLevel && parent) {\n                const sameClassSiblings = parent.querySelectorAll(token);\n                if (sameClassSiblings.length === 1)\n                    bestTokenForLevel = token;\n            }\n        }\n        // Ordinal is the weakest signal.\n        if (parent) {\n            const siblings = [...parent.children];\n            const sameTagSiblings = siblings.filter(sibling => (sibling).nodeName.toLowerCase() === nodeName);\n            const token = sameTagSiblings.indexOf(element) === 0 ? cssEscape(nodeName) : `${cssEscape(nodeName)}:nth-child(${1 + siblings.indexOf(element)})`;\n            const selector = uniqueCSSSelector(token);\n            if (selector)\n                return makeStrict(selector);\n            if (!bestTokenForLevel)\n                bestTokenForLevel = token;\n        }\n        else if (!bestTokenForLevel) {\n            bestTokenForLevel = nodeName;\n        }\n        tokens.unshift(bestTokenForLevel);\n    }\n    return makeStrict(uniqueCSSSelector());\n}\nfunction escapeForRegex(text) {\n    return text.replace(/[.*+?^>${}()|[\\]\\\\]/g, '\\\\$&');\n}\nfunction quoteAttributeValue(text) {\n    return `\"${cssEscape(text).replace(/\\\\ /g, ' ')}\"`;\n}\nfunction joinTokens(tokens) {\n    const parts = [];\n    let lastEngine = '';\n    for (const { engine, selector } of tokens) {\n        if (parts.length && (lastEngine !== 'css' || engine !== 'css' || selector.startsWith(':nth-match(')))\n            parts.push('>>');\n        lastEngine = engine;\n        if (engine === 'css')\n            parts.push(selector);\n        else\n            parts.push(`${engine}=${selector}`);\n    }\n    return parts.join(' ');\n}\nfunction combineScores(tokens) {\n    let score = 0;\n    for (let i = 0; i < tokens.length; i++)\n        score += tokens[i].score * (tokens.length - i);\n    return score;\n}\nfunction chooseFirstSelector(injectedScript, scope, targetElement, selectors, allowNthMatch, strict) {\n    const joined = selectors.map(tokens => ({ tokens, score: combineScores(tokens) }));\n    joined.sort((a, b) => a.score - b.score);\n    let bestWithIndex = null;\n    for (const { tokens } of joined) {\n        const parsedSelector = injectedScript.parseSelector(joinTokens(tokens));\n        const result = injectedScript.querySelectorAll(parsedSelector, scope);\n        const isStrictEnough = !strict || result.length === 1;\n        const index = result.indexOf(targetElement);\n        if (index === 0 && isStrictEnough) {\n            // We are the first match - found the best selector.\n            return tokens;\n        }\n        // Otherwise, perhaps we can use nth=?\n        if (!allowNthMatch || bestWithIndex || index === -1 || result.length > 5)\n            continue;\n        const nth = { engine: 'nth', selector: String(index), score: kNthScore };\n        bestWithIndex = [...tokens, nth];\n    }\n    return bestWithIndex;\n}\nfunction isGuidLike(id) {\n    let lastCharacterType;\n    let transitionCount = 0;\n    for (let i = 0; i < id.length; ++i) {\n        const c = id[i];\n        let characterType;\n        if (c === '-' || c === '_')\n            continue;\n        if (c >= 'a' && c <= 'z')\n            characterType = 'lower';\n        else if (c >= 'A' && c <= 'Z')\n            characterType = 'upper';\n        else if (c >= '0' && c <= '9')\n            characterType = 'digit';\n        else\n            characterType = 'other';\n        if (characterType === 'lower' && lastCharacterType === 'upper') {\n            lastCharacterType = characterType;\n            continue;\n        }\n        if (lastCharacterType && lastCharacterType !== characterType)\n            ++transitionCount;\n        lastCharacterType = characterType;\n    }\n    return transitionCount >= id.length / 4;\n}\nfunction cssEscape(s) {\n    let result = '';\n    for (let i = 0; i < s.length; i++)\n        result += cssEscapeOne(s, i);\n    return result;\n}\nfunction cssEscapeOne(s, i) {\n    // https://drafts.csswg.org/cssom/#serialize-an-identifier\n    const c = s.charCodeAt(i);\n    if (c === 0x0000)\n        return '\\uFFFD';\n    if ((c >= 0x0001 && c <= 0x001f) ||\n        (c >= 0x0030 && c <= 0x0039 && (i === 0 || (i === 1 && s.charCodeAt(0) === 0x002d))))\n        return '\\\\' + c.toString(16) + ' ';\n    if (i === 0 && c === 0x002d && s.length === 1)\n        return '\\\\' + s.charAt(i);\n    if (c >= 0x0080 || c === 0x002d || c === 0x005f || (c >= 0x0030 && c <= 0x0039) ||\n        (c >= 0x0041 && c <= 0x005a) || (c >= 0x0061 && c <= 0x007a))\n        return s.charAt(i);\n    return '\\\\' + s.charAt(i);\n}\n\n/* eslint-disable import/no-import-module-exports */\nfunction addEventListener(target, eventName, listener, useCapture) {\n    target.addEventListener(eventName, listener, useCapture);\n    const remove = () => {\n        target.removeEventListener(eventName, listener, useCapture);\n    };\n    return remove;\n}\nfunction removeEventListeners(listeners) {\n    listeners.forEach(listen => listen());\n    listeners.splice(0, listeners.length);\n}\nfunction deepEventTarget(event) {\n    var _a;\n    (_a = window._pw_getdom_) === null || _a === void 0 ? void 0 : _a.call(window, event.composedPath());\n    return event.composedPath()[0];\n}\nclass ConsoleExtends {\n    constructor(injected) {\n        this.hoveredModel = null;\n        this.isRecording = true;\n        this.listeners = [];\n        if (window.CODE_GENER)\n            return;\n        if (window.injected)\n            return;\n        window.injected = injected;\n        this.injected = injected;\n        this.highlight = new Highlight(false);\n        this.install();\n    }\n    install() {\n        // Ensure we are attached to the current document, and we are on top (last element);\n        if (this.highlight.isInstalled()) {\n            return;\n        }\n        removeEventListeners(this.listeners);\n        this.listeners = [\n            // addEventListener(\n            //   document,\n            //   'click',\n            //   event => this._onClick(event as MouseEvent),\n            //   true,\n            // ),\n            // addEventListener(\n            //   document,\n            //   'auxclick',\n            //   event => this._onClick(event as MouseEvent),\n            //   true,\n            // ),\n            // addEventListener(document, 'input', event => this._onInput(event), true),\n            // addEventListener(\n            //   document,\n            //   'keydown',\n            //   event => this._onKeyDown(event as KeyboardEvent),\n            //   true,\n            // ),\n            // addEventListener(\n            //   document,\n            //   'keyup',\n            //   event => this._onKeyUp(event as KeyboardEvent),\n            //   true,\n            // ),\n            // addEventListener(\n            //   document,\n            //   'mousedown',\n            //   event => this._onMouseDown(event as MouseEvent),\n            //   true,\n            // ),\n            // addEventListener(\n            //   document,\n            //   'mouseup',\n            //   event => this._onMouseUp(event as MouseEvent),\n            //   true,\n            // ),\n            addEventListener(document, 'mousemove', event => this.onMouseMove(event), true),\n            // addEventListener(\n            //   document,\n            //   'mouseleave',\n            //   event => this._onMouseLeave(event as MouseEvent),\n            //   true,\n            // ),\n            // addEventListener(document, 'focus', () => this._onFocus(), true),\n            addEventListener(document, 'scroll', () => {\n                this.hoveredModel = null;\n                this.highlight.hideActionPoint();\n                this.updateHighlight();\n            }, true),\n        ];\n        this.highlight.install();\n    }\n    onMouseMove(evt) {\n        const target = deepEventTarget(evt);\n        if (this.hoveredElement === target)\n            return;\n        this.hoveredElement = target;\n        this.updateModelForHoveredElement();\n    }\n    updateModelForHoveredElement() {\n        if (!this.hoveredElement) {\n            this.hoveredModel = null;\n            this.updateHighlight();\n            return;\n        }\n        const { hoveredElement } = this;\n        const { selector, elements } = generateSelector(this.injected, hoveredElement, true);\n        if ((this.hoveredModel && this.hoveredModel.selector === selector) ||\n            this.hoveredElement !== hoveredElement)\n            return;\n        this.hoveredModel = selector ? { selector, elements } : null;\n        this.updateHighlight();\n    }\n    updateHighlight() {\n        const elements = this.hoveredModel ? this.hoveredModel.elements : [];\n        const selector = this.hoveredModel ? this.hoveredModel.selector : '';\n        this.highlight.updateHighlight(elements, selector, false);\n    }\n}\nmodule.exports = ConsoleExtends;";
export default source;
