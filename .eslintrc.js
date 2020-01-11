module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   ecmaVersion: 2018,
  // },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    // 'google',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};
