import { IUIState } from '@/isomorphic/services';
import { IUIActions } from '@/recorder/services';
import ICode from '@/recorder/services/code';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Code from '../components/code';
import StateBar from '../components/state-bar';
import './app.less';

export interface AppProps {
  icode: ICode;
  uiActions: IUIActions;
  uiState: IUIState;
}

export default function App({ icode, uiState, uiActions }: AppProps) {
  const [code, setCode] = useState(icode.getCode());
  useEffect(() => {
    const cb = () => {
      setCode(icode.getCode());
    };
    icode.onCodeChange.on(cb);
    return () => icode.onCodeChange.off(cb);
  }, [icode]);

  return (
    <div className="record-app">
      <StateBar uiState={uiState} uiActions={uiActions} />
      <Code code={code} />
    </div>
  );
}

export function init(
  container: HTMLElement,
  { icode, uiState, uiActions }: AppProps,
) {
  ReactDOM.render(
    <App icode={icode} uiState={uiState} uiActions={uiActions} />,
    container,
  );
}
