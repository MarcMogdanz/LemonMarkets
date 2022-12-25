// eslint-disable-next-line no-undef
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "error",
    // needs to be disabled for the typescript version of the rule to work
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    // needs to be disabled for the typescript version of the rule to work
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": "warn",
  },
  root: true,
};
