import typescript from '@rollup/plugin-typescript';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import less from 'rollup-plugin-less';
// import { terser } from 'rollup-plugin-terser';

const output = path => `assets/${path}`;

function htmlTemplate({ title }) {
  return `<!DOCTYPE html>
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <script>
      window.CODE_GENER = true;
    </script>
  </head>
  <body>
    <script src="https://gw.alipayobjects.com/as/g/larkgroup/lake-codemirror/7.0.3/CodeMirror.js"></script>
    <script src="./index.js"></script>
  </body>
  </html>
`;
}

export default [
  {
    input: 'src/recorder/index.ts',
    output: {
      dir: output('page'),
      format: 'cjs',
    },
    plugins: [
      typescript({
        compilerOptions: {
          module: 'esnext',
        },
      }),
      nodeResolve(),
      less({
        insert: true,
        output: output('page/index.css'),
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      commonjs({
        defaultIsModuleExports: true,
      }),
      html({
        title: '测试代码生成',
        template: htmlTemplate,
      }),
      {
        name: 'banner',
        renderChunk: function renderChunk(code) {
          return `/* eslint-disable */\n${code}`;
        },
      },
    ],
  },
  {
    input: 'src/injected/index.ts',
    output: {
      file: output('/generated/injected.js'),
      format: 'cjs',
    },
    plugins: [
      typescript({
        compilerOptions: {
          module: 'esnext',
        },
      }),
    ],
  },
];
