module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  plugins: ['vue', '@typescript-eslint'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 0,
  },
}
