import { genInjectID, IEvent } from '@/core';

/**
 * 代码服务
 */
export interface ICode {
  onCodeChange: IEvent<void>;
  getCode(): string;
}

export const ICode = genInjectID<ICode>();

export default ICode;
