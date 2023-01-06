#!/usr/bin/env node

const { program } = require('commander');
const { EOL } = require('os');
const pkg = require('../package.json');

const { runCmd } = require('./cmds/run');

// 主命令
program
  .option('-v, --version', 'show version and exit')
  .option('-h, --help', 'show help')
  .addCommand(runCmd)
  .addHelpText('before', `${EOL}${pkg.description}${EOL}`)
  .usage('run url')
  .showHelpAfterError(true)
  .action((options) => {
    if (options.version) {
      console.info('%s  %s%s', EOL, pkg.version, EOL);
    } else {
      program.help();
    }
  });

program.parse(process.argv);
