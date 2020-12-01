module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/extensions": [
      2,
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".tsx", ".ts"],
      },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/no-array-index-key": "off",
    "no-underscore-dangle": "off",
    "react/jsx-one-expression-per-line": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["./"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
