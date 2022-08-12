import { autowired, IPlugin } from '@/core';
import { IHighlight } from '@/injected/services';

declare global {
  interface Window {
    hasShowHighlight?: boolean;
  }
}

export default class WebPlugin implements IPlugin {
  @autowired(IHighlight)
  highlight: IHighlight;

  async init() {
    const dom = document.querySelector('#root') as HTMLElement;
    // 通过highlight的输出获取到 高亮信息
    console.error = (msg: string) => {
      const { width, height } = dom.getBoundingClientRect();
      if (
        msg.includes('Highlight box for test:') &&
        msg.includes(`"width":${Math.floor(width).toFixed(0)}`) &&
        msg.includes(`"height":${Math.floor(height).toFixed(0)}`)
      ) {
        window.hasShowHighlight = true;
      }
    };
    this.highlight.updateHighlight([dom], 'highlight tips');
  }
}
