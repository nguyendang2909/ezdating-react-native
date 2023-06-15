const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "standard",
    "prettier"],
  plugins: [
    'prettier',
    'simple-import-sort',
     "@typescript-eslint",
     "react",
     "react-native",
     "unused-imports"
    ],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
    'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "project": "./tsconfig.json"
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  "globals": {
    "__DEV__": false,
    "jasmine": false,
    "beforeAll": false,
    "afterAll": false,
    "beforeEach": false,
    "afterEach": false,
    "test": false,
    "expect": false,
    "describe": false,
    "jest": false,
    "it": false
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      plugins: ['simple-import-sort'],
      rules: {
        'prettier/prettier': ['warn', prettierOptions],
        'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
        'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
        'import/no-anonymous-default-export': 'off',
        '@typescript-eslint/no-namespace': 'off',
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_"
          }
        ],
      },
    },
  ],
};
