import ICode from '@/recorder/services/code';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Code from '../components/code';
import './app.less';

export interface AppProps {
  icode: ICode;
}

export default function App({ icode }: AppProps) {
  const [code, setCode] = useState(icode.getCode());
  useEffect(() => {
    const cb = () => {
      setCode(icode.getCode());
    };
    icode.onCodeChange.on(cb);
    return () => icode.onCodeChange.off(cb);
  }, [icode]);

  return <Code code={code} />;
}

export function init(container: HTMLElement, code: ICode) {
  ReactDOM.render(<App icode={code} />, container);
}
