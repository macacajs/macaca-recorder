import { program } from 'commander';
import { EOL } from 'os';
import pkg from '../package.json';

import { runCmd } from './cmds/run';

// 主命令
program
  .option('-v, --version', 'show version and exit')
  .option('-h, --help', 'show help')
  .addCommand(runCmd)
  .addHelpText('before', `${EOL}${pkg.description}${EOL}`)
  .usage('run url')
  .showHelpAfterError(true)
  .action((options: { version?: boolean; help?: boolean }) => {
    if (options.version) {
      console.info('%s  %s%s', EOL, pkg.version, EOL);
    } else {
      program.help();
    }
  });

program.parse(process.argv);
