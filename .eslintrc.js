module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   ecmaVersion: 2018,
  // },
  plugins: [
    '@typescript-eslint',
    "jest",
    "react-hooks"
  ],
  extends: [
    // 'google',
    'eslint:recommended',
    "plugin:react/recommended",
    "plugin:node/recommended",
    "plugin:eslint-comments/recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:jest/recommended",
    "plugin:jest/style"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
