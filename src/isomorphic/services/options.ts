import { genInjectID } from '@/core';

export type CodeEngineType = 'editor' | 'macaca';

/**
 * 全局配置
 */
export interface IOptions {
  readonly recorderEngine: CodeEngineType;
  readonly showHightlight: boolean;

  setRecorderEngine(engine: CodeEngineType): IOptions;
  setShowHighlight(show: boolean): IOptions;
}

export const IOptions = genInjectID<IOptions>();

export default IOptions;
