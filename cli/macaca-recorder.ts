import { program } from 'commander';
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

// 启动录制命令
const recorderCommand = program
  .createCommand('run')
  .argument('<url>', 'recorder url')
  .showHelpAfterError(true)
  .action(async (url: string) => {
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

    // 设置代码生成引擎
    // app.options.setRecorderEngine('editor').setShowHighlight(false);
    app.options
      .setRecorderEngine('macaca')
      .setShowHighlight(false)
      .setStartRecordOnFirst(true);

    await app.init();

    await app.codeGen.start(url);
  });

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
