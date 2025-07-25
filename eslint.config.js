const { defineConfig, globalIgnores } = require("eslint/config");

const globals = require("globals");

const { fixupConfigRules, fixupPluginRules } = require("@eslint/compat");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.jest,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },

      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: "./tsconfig.json",
      },
    },

    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
      ),
    ),

    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },

    settings: {},

    rules: {
      "@typescript-eslint/array-type": [
        "error",
        {
          default: "array-simple",
        },
      ],

      "@typescript-eslint/consistent-type-assertions": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/dot-notation": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      indent: [
        "error",
        2,
        {
          SwitchCase: 1,
          ObjectExpression: "first",
          FunctionDeclaration: {
            parameters: "first",
          },
          FunctionExpression: {
            parameters: "first",
          },
          ignoredNodes: ["TSTypeParameterInstantiation"],
        },
      ],

      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/member-ordering": "off",

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE", "snake_case"],
          leadingUnderscore: "allow",
        },
        {
          selector: "memberLike",
          modifiers: ["private"],
          format: ["camelCase"],
          leadingUnderscore: "require",
        },
      ],

      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-parameter-properties": "off",

      "@typescript-eslint/no-this-alias": [
        "error",
        {
          allowDestructuring: true,
        },
      ],

      "@typescript-eslint/no-unused-expressions": "error",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "none",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/prefer-for-of": "off",
      "@typescript-eslint/prefer-function-type": "error",
      "@typescript-eslint/prefer-namespace-keyword": "error",

      "@typescript-eslint/triple-slash-reference": [
        "error",
        {
          path: "always",
          types: "prefer-import",
          lib: "always",
        },
      ],

      "@typescript-eslint/unified-signatures": "error",
      "arrow-parens": ["off", "always"],
      "brace-style": ["off", "off"],
      complexity: "off",
      "constructor-super": "error",
      eqeqeq: ["error", "smart"],
      "guard-for-in": "error",
      "id-match": "error",
      "import/no-extraneous-dependencies": "error",

      "import/no-internal-modules": [
        "off",
        {
          allow: ["excluded-module1/*", "excluded-module2/*"],
        },
      ],

      "import/order": "off",
      "max-classes-per-file": "off",

      "max-len": [
        "error",
        {
          ignorePattern: "//|^import |^export ",
          code: 140,
        },
      ],

      "new-parens": "error",
      "no-bitwise": "off",
      "no-caller": "error",
      "no-cond-assign": "error",
      "no-console": "off",
      "no-debugger": "error",
      "no-duplicate-case": "error",
      "no-duplicate-imports": "error",
      "no-empty": "error",
      "no-eval": "error",
      "no-extra-bind": "error",
      "no-fallthrough": "off",
      "no-invalid-this": "off",
      "no-multiple-empty-lines": "off",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-redeclare": "off",
      "no-return-await": "error",
      "no-sequences": "error",

      "no-shadow": [
        "error",
        {
          hoist: "all",
        },
      ],

      "no-sparse-arrays": "error",
      "no-template-curly-in-string": "error",
      "no-throw-literal": "error",

      "no-trailing-spaces": [
        "error",
        {
          ignoreComments: true,
          skipBlankLines: true,
        },
      ],

      "no-undef-init": "error",
      "no-underscore-dangle": "off",
      "no-unsafe-finally": "error",
      "no-unused-labels": "error",
      "no-var": "error",
      "object-shorthand": "off",
      "one-var": ["error", "never"],
      "prefer-const": "error",
      "prefer-object-spread": "error",
      quotes: ["error", "double"],
      "quote-props": ["error", "as-needed"],
      radix: "error",
      "space-in-parens": ["error", "never"],

      "spaced-comment": [
        "error",
        "always",
        {
          markers: ["/"],
        },
      ],

      "use-isnan": "error",
      "valid-typeof": "error",
    },
  },
  globalIgnores([
    "src/**/__tests__/**/*",
    "**/node_modules",
    "**/.eslintrc.js",
    "**/webpack.*.js",
    "**/test/",
    "**/bin/",
    "**/nyc.config.ts",
    "**/build/",
    "**/dist/",
    "**/example/",
    "**/eslint.config.js",
    "**/jest.config.js",
    "**/pre_publish.js",
    "**/prettierrc.mjs",
  ]),
]);
