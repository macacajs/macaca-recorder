import { IUIState } from '@/isomorphic/services';
import ICode from '@/recorder/services/code';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Code from '../components/code';
import StateBar from '../components/state-bar';
import './app.less';

export interface AppProps {
  icode: ICode;
  uiState: IUIState;
}

export default function App({ icode, uiState }: AppProps) {
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
      <StateBar uiState={uiState} />
      <Code code={code} />
    </div>
  );
}

export function init(container: HTMLElement, { icode, uiState }: AppProps) {
  ReactDOM.render(<App icode={icode} uiState={uiState} />, container);
}
