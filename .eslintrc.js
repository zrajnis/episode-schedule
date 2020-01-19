module.exports = {
  env: {
    'browser': true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', 
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
        jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/indent': [ 'error', 2 ],
    '@typescript-eslint/explicit-function-return-type': false,
    '@typescript-eslint/member-delimiter-style': false,
    '@typescript-eslint/no-non-null-assertion': false,
    '@typescript-eslint/no-var-requires': false,
    '@typescript-eslint/interface-name-prefix': 'always',
    'max-len': [
      'error',
      120
    ],
    'newline-after-var': [
      2,
      'always'
    ],
    'newline-before-return': 'error',
    'no-console': 1,
    'array-bracket-spacing': [
      "error",
      "always",
      {
        "arraysInArrays": false,
        "objectsInArrays": false
      }
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'padding-line-between-statements': [ 'error', {
      blankLine: 'always',
      prev: '*',
      next: 'if'
    }, {
      blankLine: 'any',
      prev: 'block',
      next: 'if'
    }, {
      blankLine: 'always',
      prev: 'if',
      next: '*'
    }, {
      blankLine: 'any',
      prev: 'if',
      next: 'block'
    }, {
      blankLine: 'always',
      prev: 'export',
      next: '*'
    }],
    'react/jsx-max-props-per-line': 1,
    'react/jsx-sort-props': 1,
    'react/no-did-update-set-state': 0,
    'sort-keys': 'warn',
    'sort-vars': 'warn'
  }
}
