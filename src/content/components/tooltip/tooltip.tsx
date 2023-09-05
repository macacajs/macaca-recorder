import React from 'react';
import './tooltip.less';
import { MACACA_RECORDER_CONTAINER_TOOLTIP } from '@/constants';

function Tooltip() {
  return (
    <div
      className={MACACA_RECORDER_CONTAINER_TOOLTIP}
      id={MACACA_RECORDER_CONTAINER_TOOLTIP}
    />
  );
}

export default Tooltip;
