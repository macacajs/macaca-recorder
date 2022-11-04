import { program, Command } from 'commander';
import { EOL } from 'os';
import {
  ApiPlugin,
  App,
  IOptionPlugin,
  EventPlugin,
  GeneratorPlugin,
  BrowserPlugin,
  UIStatePlugin,
  iapiID,
} from '../src';
import pkg from '../package.json';

export type CodeEngineType = 'macaca' | 'sky' | 'editor';

// eslint-disable-next-line consistent-return
function getEngineType(engine: string, cmd: Command): CodeEngineType {
  if (['macaca', 'sky', 'editor'].includes(engine)) {
    return engine as CodeEngineType;
  }
  cmd.addHelpText('before', `${EOL}unknown engine ${engine}${EOL}`);
  cmd.help();
}

// 启动录制命令
const recorderCommand = program
  .createCommand('run')
  .option(
    '-e, --engine <engine>',
    'gen code engine, engines: macaca, sky, editor',
    'macaca',
  )
  .option('-h, --highlight', 'show highlight', false)
  .argument('<url>', 'recorder url')
  .showHelpAfterError(true)
  .action(
    async (
      url: string,
      options: { engine: string; highlight: boolean },
      cmd: Command,
    ) => {
      const app = await App.createApp(
        [
          ApiPlugin,
          IOptionPlugin,
          EventPlugin,
          GeneratorPlugin,
          BrowserPlugin,
          UIStatePlugin,
        ],
        iapiID,
      );

      app.options
        .setRecorderEngine(getEngineType(options.engine, cmd))
        .setShowHighlight(options.highlight)
        .setStartRecordOnFirst(true);

      await app.init();

      await app.codeGen.start(url);
    },
  );

program
  .option('-v, --version', 'show version and exit')
  .option('-h, --help', 'show help')
  .addCommand(recorderCommand)
  .addHelpText('before', `${EOL}${pkg.description}${EOL}`)
  .usage('run url')
  .showHelpAfterError(true);

program.parse(process.argv);

if (program.getOptionValue('version')) {
  console.info('%s  %s%s', EOL, pkg.version, EOL);
} else if (program.getOptionValue('help')) {
  program.help();
}
