const path = require('path');

module.exports = {
  extends: [
    'react-app',
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['only-warn', 'react', 'jsx-a11y', 'simple-import-sort'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'arrow-body-style': ['warn', 'as-needed'],
  },
  overrides: [
    {
      files: ['*'],
      rules: {
        'simple-import-sort/imports': [
          'warn',
          {
            groups: [
              [
                '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
              ],
              ['^', '^@'],
              ['^(@src)(/.*|$)'],
              ['^\\u0000'],
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '.styled$'],
              ['^.+\\.s?css$'],
            ],
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@utils', path.resolve(__dirname, 'src/utils')],
          ['@components', path.resolve(__dirname, 'src/components')],
          ['three', path.resolve(__dirname, 'node_modules/three')],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
};
