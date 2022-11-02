import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const defaultOptions = {
  targetDir: path.resolve(process.cwd(), 'playground', 'test'),
  fileName: 'demo1.test.js',
};

function dumpFile(options = defaultOptions) {
  const targetFile = path.resolve(options.targetDir, options.fileName);
  console.log('file: %s', chalk.cyan(targetFile));
  // fs.writeFileSync(targetFile, '');
}

export default dumpFile;
