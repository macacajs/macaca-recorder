import typescript from "@rollup/plugin-typescript";
// import { terser } from 'rollup-plugin-terser';

const output = (path) => `src/node/plugins/generator/${path}`;

export default [
  {
    input: "src/recorder/index.ts",
    output: {
      dir: output("page"),
      format: "cjs",
    },
    plugins: [
      typescript({
        compilerOptions: {
          module: "esnext",
        },
      }),
      {
        name: "banner",
        renderChunk: function renderChunk(code) {
          return `/* eslint-disable */\n${code}`;
        },
      },
    ],
  },
  {
    input: "src/injected/index.ts",
    output: {
      file: output("/generated/injected.ts"),
      format: "cjs",
    },
    plugins: [
      typescript({
        compilerOptions: {
          module: "esnext",
        },
      }),
      // terser(),
      {
        name: "banner",
        renderChunk: function renderChunk(code) {
          return `/* eslint-disable */\n"use strict";\nexport const source = ${JSON.stringify(
            code
          )};\nexport default source;\n`;
        },
      },
    ],
  },
];
