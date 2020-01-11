module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   ecmaVersion: 2018,
  // },
  plugins: [
    '@typescript-eslint',
    "react-hooks"
  ],
  extends: [
    // 'google',
    'eslint:recommended',
    "plugin:react/recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
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
