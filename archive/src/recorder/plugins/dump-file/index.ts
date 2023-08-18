import { autowired, IPlugin } from '@/core';
import { ICode } from '@/recorder/services';

declare global {
  interface Window {
    __onCodeChange(code: string): Promise<void>;
  }
}

export default class DumpFilePlugin implements IPlugin {
  @autowired(ICode)
  code: ICode;

  async afterInit() {
    // 如果window 有注册代码回调 则监听代码变动 传递回去
    // eslint-disable-next-line no-underscore-dangle
    if (window.__onCodeChange) {
      this.code.onCodeChange.on(() => {
        // eslint-disable-next-line no-underscore-dangle
        window.__onCodeChange(this.code.getCode());
      });
    }
  }
}
