import * as path from 'path';
import * as fs from 'fs';

export const ROOT_DIR = (() => {
  let rootPath = path.join(__dirname, '../../');
  while (!fs.existsSync(path.join(rootPath, 'package.json'))) {
    rootPath = path.join(rootPath, '../');
  }
  return rootPath;
})();

export const ASSETS_PATH = path.join(ROOT_DIR, 'assets');
