import IActions from '@/recorder/services/action';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Code from '../components/code';
import './app.less';

export interface AppProps {
  actions: IActions;
}

export default function App({ actions }: AppProps) {
  const [code, setCode] = useState(actions.getCode());
  useEffect(() => {
    const cb = () => {
      setCode(actions.getCode());
    };
    actions.onActionChange.on(cb);
    return () => actions.onActionChange.off(cb);
  }, [actions]);

  return <Code code={code} />;
}

export function init(container: HTMLElement, actions: IActions) {
  ReactDOM.render(<App actions={actions} />, container);
}
