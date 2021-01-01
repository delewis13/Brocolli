console.log('Loading eslintrc...')

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    // 'import/resolver': 'webpack',
    'import/resolver': {
      node: {},
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
      webpack: {},
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['unused-imports', 'simple-import-sort', 'react-hooks'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-control-regex': 0,
    'simple-import-sort/sort': [
      'error',
      {
        // See https://github.com/lydell/eslint-plugin-simple-import-sort
        // and https://github.com/lydell/eslint-plugin-simple-import-sort/blob/master/examples/.eslintrc.js
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^(@/)(.*|$)', '^(src/)(.*|$)'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
    // https://www.npmjs.com/package/eslint-plugin-unused-imports
    // '@typescript-eslint/no-unused-vars': [1],
    // 'no-unused-vars': [1],
    'unused-imports/no-unused-imports-ts': [1],

    // We can switch this back on when this is merged
    // https://github.com/typescript-eslint/typescript-eslint/issues/1845
    '@typescript-eslint/explicit-module-boundary-types': [0],
    '@typescript-eslint/no-explicit-any': [0],

    // See: https://github.com/typescript-eslint/typescript-eslint/issues/1054
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [1, { ignoreRestSiblings: true }],

    // See: https://eslint.org/docs/rules/prefer-const
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    // 'unused-imports/no-unused-vars': [
    //   'warn',
    //   {
    //     vars: 'all',
    //     varsIgnorePattern: '^_',
    //     args: 'after-used',
    //     argsIgnorePattern: '^_',
    //   },
    // ],
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
}
