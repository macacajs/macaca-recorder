import { program, Command } from 'commander';
import { EOL } from 'os';
import npmUpdate from 'npm-update';
import {
  ApiPlugin,
  App,
  IOptionPlugin,
  EventPlugin,
  GeneratorPlugin,
  BrowserPlugin,
  UIStatePlugin,
  iapiID,
} from '../../src';
import pkg from '../../package.json';

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
export const runCmd = program
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
      try {
        await npmUpdate({
          pkg,
        });
      } catch (_) {}
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
