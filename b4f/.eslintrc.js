module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-extra-boolean-cast': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    'max-len': [
      'error',
      {
        code: 160,
        ignoreComments: true,
        ignoreUrls: true,
      }
    ],
    '@typescript-eslint/indent': ['error', 2]
  },
  ignorePatterns: ['migrations/', 'entrypoint.sh', 'jest.config.ts', '.eslintrc.js']
}