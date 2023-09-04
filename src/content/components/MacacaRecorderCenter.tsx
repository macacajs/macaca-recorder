import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Widget from './widget/widget';
import Tooltip from './tooltip/tooltip';

interface Props {
  handleWidgetClick: () => void;
  onRef: any;
  enabled: boolean;
}

export default forwardRef((props: Props, ref) => {
  const { handleWidgetClick, onRef, enabled: e } = props;
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
          <Tooltip />
          <Widget handleWidgetClick={handleWidgetClick} onRef={onRef} />
        </>
      )}
    </div>
  );
});
