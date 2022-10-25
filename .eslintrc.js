module.exports = {
  root: true,
  env: {
    browser: false,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'no-useless-constructor': 0,
    'no-plusplus': 0,
    'no-console': 0,
  },
  overrides: [
    {
      files: ['test/*.ts'],
      rules: {
        'max-classes-per-file': 0,
        'no-use-before-define': 0,
      },
    },
  ],
};
