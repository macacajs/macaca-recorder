import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Widget from './widget/widget';
import Tooltip from './tooltip/tooltip';

interface Props {
  handleWidgetClick: (action: string, opts: object) => void;
  onWidgetRef: any;
  onTooltipRef: any
  enabled: boolean;
}

export default forwardRef((props: Props, ref) => {
  const {
    handleWidgetClick, onWidgetRef, onTooltipRef, enabled: e,
  } = props;
  const [enabled, setEnabled] = useState(e);

  const updateEnabled = (status) => {
    setEnabled(status);
  };

  useImperativeHandle(ref, () => ({
    updateEnabled,
  }));

  return (
    <div>
      {enabled && (
        <>
          <Tooltip onRef={onTooltipRef} />
          <Widget handleWidgetClick={handleWidgetClick} onRef={onWidgetRef} />
        </>
      )}
    </div>
  );
});
