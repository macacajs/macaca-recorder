import { genInjectID } from '@/core';

export type CodeEngineType = 'editor' | 'macaca';

/**
 * 全局配置
 */
export interface IOptions {
  /**
   * 代码生成引擎
   */
  readonly recorderEngine: CodeEngineType;
  /**
   * 是否启用高亮
   */
  readonly showHightlight: boolean;
  /**
   * 默认开始录制
   */
  readonly startRecordOnFirst: boolean;

  setRecorderEngine(engine: CodeEngineType): IOptions;
  setShowHighlight(show: boolean): IOptions;
  setStartRecordOnFirst(startRecord: boolean): IOptions;
}

export const IOptions = genInjectID<IOptions>();

export default IOptions;
