const { program } = require('commander');
const { EOL } = require('os');
const fs = require('fs');
const npmUpdate = require('npm-update');
const pkg = require('../../package.json');
const {
  ApiPlugin,
  App,
  IOptionPlugin,
  EventPlugin,
  GeneratorPlugin,
  BrowserPlugin,
  UIStatePlugin,
  iapiID,
  DumpFilePlugin,
  IProxyPlugin,
} = require('../../lib/cjs');

// eslint-disable-next-line consistent-return
function getEngineType(engine, cmd) {
  if (['macaca', 'sky', 'editor'].includes(engine)) {
    return engine;
  }
  if (fs.existsSync(engine)) {
    return fs.realpathSync(engine);
  }
  cmd.addHelpText('before', `${EOL}unknown template ${engine}${EOL}`);
  cmd.help();
}

// 启动录制命令
exports.runCmd = program
  .createCommand('run')
  .option(
    '-t, --template <template>',
    'gen code template, template: macaca, sky, editor or local template file',
    'macaca',
  )
  .option('-h, --highlight', 'show highlight', false)
  .argument('<url>', 'recorder url')
  .showHelpAfterError(true)
  .action(async (url, options, cmd) => {
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
        IProxyPlugin,
      ],
      iapiID,
    );

    app.options
      .setRecorderEngine(getEngineType(options.template, cmd))
      .setShowHighlight(options.highlight)
      .setStartRecordOnFirst(true);

    await app.init();

    await app.codeGen.start(url);
  });
