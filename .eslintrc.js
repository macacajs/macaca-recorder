'use strict';

/* eslint-env node */
const eslintConfig = {
  extends: 'eslint-config-egg',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          [ '@', `${__dirname}/src` ],
        ],
        extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module'
  },
  plugins: [
    'import',
    'react',
    'react-hooks',
  ],
  ignorePatterns: [ '*.d.ts' ],
  rules: {
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
  },
  overrides: [],
};

const tslintConfig = {
  // enable the rule specifically for TypeScript files
  files: [ '*.ts', '*.tsx' ],
  extends: [
    'eslint-config-egg/typescript',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-airbnb'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [ '.ts', '.tsx' ],
    },
    'import/resolver': {
      ...eslintConfig.settings['import/resolver'],
      typescript: {
        project: [
          'tsconfig.json',
        ],
      },
    },
  },
  rules: {
    ...eslintConfig.rules,
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    strict: 'off',
    '@typescript-eslint/ban-ts-comment': [ 'warn' ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [".tsx"]
      }
    ]
  },
};

eslintConfig.overrides.push(tslintConfig);

module.exports = eslintConfig;
