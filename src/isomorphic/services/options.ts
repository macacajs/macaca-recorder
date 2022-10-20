import { genInjectID, IEvent } from '@/core';

export type CodeEngineType = 'editor' | 'macaca';

/**
 * 全局配置
 */
export interface IOptions {
  readonly recorderEngine: CodeEngineType;

  setRecorderEngine(engine: CodeEngineType): IOptions;
}

export const IOptions = genInjectID<IOptions>();

export default IOptions;
