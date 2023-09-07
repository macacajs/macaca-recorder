import React, {
  useState, useRef, useImperativeHandle, useEffect,
} from 'react';
import './tooltip.less';
import { MACACA_RECORDER_CONTAINER_TOOLTIP } from '@/constants';

interface Props {
  onRef: any;
}

function Tooltip(props: Props) {
  const { onRef } = props;
  const [selectors, setSelectors] = useState([]);
  const [elementRect, setElementRect] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    pageWidth: 0,
  });
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const elementRef = useRef(null);

  const updateTooltip = (currentRect, currentSelectors) => {
    setSelectors(currentSelectors?.selectors);
    setElementRect(currentRect);
  };

  useEffect(() => {
    const width = elementRef.current.offsetWidth;
    let left = 0;
    let top = 0;
    if (width + elementRect.left > elementRect.pageWidth) {
      left = elementRect.left + elementRect.width - width;
    } else {
      left = elementRect.left;
    }
    top = elementRect.top + elementRect.height + 5;
    setPosition({ left, top });
  }, selectors);

  useImperativeHandle(onRef, () => ({
    updateTooltip,
  }));

  return (
    <div
      className={MACACA_RECORDER_CONTAINER_TOOLTIP}
      id={MACACA_RECORDER_CONTAINER_TOOLTIP}
      style={{ ...position }}
      ref={elementRef}
    >
      {selectors && selectors.map((selector) => (
        <>
          <span id={MACACA_RECORDER_CONTAINER_TOOLTIP}>
            {`[${selector.index + 1}/${selector.length}] ${selector.xpath}`}
          </span>
          <br />
        </>
      ))}
    </div>
  );
}

export default Tooltip;
