/* eslint-disable class-methods-use-this */
import { IFS } from '@/isomorphic/services/proxy';
import * as fs from 'fs';

export default class FS implements IFS {
  async cwd(): Promise<string> {
    return process.cwd();
  }

  async exsits(path: string): Promise<boolean> {
    return fs.existsSync(path);
  }
}
