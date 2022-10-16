import { IUIState, UIRecordState } from '@/isomorphic/services';
import React, { useCallback, useState } from 'react';

export interface IStateBarProps {
  uiState: IUIState;
}

export default function StateBar({ uiState }: IStateBarProps) {
  const [state, setState] = useState(uiState.state);

  const handleClick = useCallback(() => {
    if (state !== UIRecordState.recording) {
      uiState
        .setState(UIRecordState.recording)
        .then(() => setState(UIRecordState.recording));
    } else {
      uiState
        .setState(UIRecordState.pause)
        .then(() => setState(UIRecordState.pause));
    }
  }, [state]);

  return (
    <div>
      <button onClick={handleClick}>
        {state !== UIRecordState.recording ? '开始录制' : '停止录制'}
      </button>
    </div>
  );
}
