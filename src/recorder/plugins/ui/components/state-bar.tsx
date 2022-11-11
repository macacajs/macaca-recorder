import { IUIState, UIRecordState } from '@/isomorphic/services';
import { IUIActions } from '@/recorder/services';
import React, { useCallback, useEffect, useState } from 'react';

import './state-bar.less';

export interface IStateBarProps {
  uiState: IUIState;
  uiActions: IUIActions;
}

export default function StateBar({ uiState, uiActions }: IStateBarProps) {
  const [state, setState] = useState(uiState.state);
  const [actions, setActions] = useState(uiActions.uiActions);

  useEffect(() => {
    const handleActionChange = () => {
      setActions(uiActions.uiActions.slice(0));
    };
    uiActions.changeEvent.on(handleActionChange);
    return () => uiActions.changeEvent.off(handleActionChange);
  }, [uiActions, setActions]);

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
      <button className="action-bar" onClick={handleClick}>
        {state !== UIRecordState.recording ? '开始录制' : '停止录制'}
      </button>
      {actions.map((v, index) => {
        return (
          <button
            className="action-bar"
            key={`${v.name}${index}`}
            onClick={v.action}
          >
            {v.name}
          </button>
        );
      })}
    </div>
  );
}
