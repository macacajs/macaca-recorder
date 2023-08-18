/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
import React, { createRef, useEffect, useState } from 'react';
import './code.less';

interface CM {
  destroy(): void;
  setValue(value: string): void;
}

declare global {
  interface Window {
    CodeMirror: {
      default: new (parent: HTMLDivElement, opt: any) => CM;
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

export interface CodeProps {
  code: string;
}

export default function Code({ code }: CodeProps) {
  const [cm, setCM] = useState<CM | null>(null);
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    if (cm) {
      cm.setValue(code);
    }
  }, [cm, code]);

  useEffect(() => {
    if (!ref.current) return noop;
    const _cm = new window.CodeMirror.default(ref.current, {
      lineNumbers: true,
      matchBrackets: true,
      mode: 'javascript',
      useDefaultKeyMap: true,
      readOnly: true,
    });

    _cm.setValue(code);
    setCM(_cm);
    return () => _cm.destroy();
  }, [ref.current]);

  return <div className="code-container" ref={ref}></div>;
}
