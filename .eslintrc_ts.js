module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    "jest",
    "react-hooks"
  ],
  extends: [
    'eslint:recommended',
    "plugin:react/recommended",
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
    "react-hooks/exhaustive-deps": "warn",

    // indent of 4 spaces
    //
    // NOTE: This causes slow linting.
    //       https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#the-indent--typescript-eslintindent-rules
    "indent": "off",  // must disable the base rule as it can report incorrect errors
    "@typescript-eslint/indent": ["error", 4]
  }
};
