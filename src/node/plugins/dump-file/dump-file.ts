import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { sync as mkdirp } from 'mkdirp';
import { render as Render } from 'microtemplate';

function genTestcase(data = {}) {
  const template = path.join(__dirname, 'testcase.template.js');
  const content = fs.readFileSync(template, 'utf8');
  const output = Render(content, data, {
    tagOpen: '<#',
    tagClose: '#>',
  });
  return output;
}

const defaultOptions = {
  targetDir: path.resolve(process.cwd(), 'macaca-recorder-testcase'),
  fileName: 'spec.test.js',
};

function dumpFile({ code, targetUrl }, options = defaultOptions) {
  mkdirp(defaultOptions.targetDir);
  const targetFile = path.resolve(options.targetDir, options.fileName);
  console.log('\n[%s] file: %s\n', moment().format('YYYY-MM-DD HH:mm:ss'), targetFile);
  mkdirp(path.dirname(targetFile));
  fs.writeFileSync(targetFile, genTestcase({
    targetUrl,
    content: code,
  }));
}

export default dumpFile;
