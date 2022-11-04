import path from 'path';

const defaultOptions = {
  targetDir: path.resolve(process.cwd(), 'playground', 'test'),
  fileName: 'demo1.test.js',
};

function dumpFile(options = defaultOptions) {
  const targetFile = path.resolve(options.targetDir, options.fileName);
  console.log('file: %s', targetFile);
  // fs.writeFileSync(targetFile, '');
}

export default dumpFile;
