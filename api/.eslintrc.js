module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:import/errors',
    'prettier',
  ],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-console': 'off',
    'comma-dangle': 'off',
  },
}
