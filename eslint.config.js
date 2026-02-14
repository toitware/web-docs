import js from "@eslint/js";
import typescript from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: ["node_modules/", "public/", "assets/", ".cache/", "coverage/"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescript.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescript.plugin,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...typescript.configs["recommended-requiring-type-checking"].rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { vars: "local", args: "after-used" }],
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      prettier: prettierPlugin,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      "react/prop-types": "off",
    },
  },
  prettier,
];
