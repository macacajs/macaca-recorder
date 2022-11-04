#!/usr/bin/env node
const path = require('path');
const projectURL = path.join(__dirname, '../');

require('ts-node').register({
  project: projectURL,
});
require('tsconfig-paths').register({
  cwd: projectURL,
});
// 启动
require('../cli/macaca-recorder');

