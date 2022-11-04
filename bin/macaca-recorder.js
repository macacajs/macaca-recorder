#!/usr/bin/env node
const path = require('path');

require('ts-node').register({
  project: path.join(__dirname, '../'),
});
// 启动
require('../cli/macaca-recorder');

