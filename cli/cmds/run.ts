/* eslint-disable no-empty */
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
  DumpFilePlugin,
} from '../../src';
import pkg from '../../package.json';

export type CodeEngineType = 'macaca' | 'sky' | 'editor';

// eslint-disable-next-line consistent-return
function getEngineType(engine: string, cmd: Command): CodeEngineType {
  if (['macaca', 'sky', 'editor'].includes(engine)) {
    return engine as CodeEngineType;
  }
  cmd.addHelpText('before', `${EOL}unknown template ${engine}${EOL}`);
  cmd.help();
}

// 启动录制命令
export const runCmd = program
  .createCommand('run')
  .option(
    '-t, --template <template>',
    'gen code template, template: macaca, sky, editor',
    'macaca',
  )
  .option('-h, --highlight', 'show highlight', false)
  .argument('<url>', 'recorder url')
  .showHelpAfterError(true)
  .action(
    async (
      url: string,
      options: {
        template: string;
        highlight: boolean;
      },
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
          DumpFilePlugin,
        ],
        iapiID,
      );

      app.options
        .setRecorderEngine(getEngineType(options.template, cmd))
        .setShowHighlight(options.highlight)
        .setStartRecordOnFirst(true);

      await app.init();

      await app.codeGen.start(url);
    },
  );
