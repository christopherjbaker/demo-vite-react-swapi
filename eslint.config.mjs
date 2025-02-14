/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */

import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import importPlugin from "eslint-plugin-import"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"

export default tseslint.config(
  {
    ignores: ["dist"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  reactHooksPlugin.configs["recommended-latest"],
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-warning-comments": ["warn", { terms: ["todo"], location: "start" }],

      "react/no-unknown-property": "off",
      "react/prop-types": "off",

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true, args: "none" },
      ],

      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",

      "import/no-named-as-default-member": "off",
      "import/consistent-type-specifier-style": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-absolute-path": "error",
      "import/no-useless-path-segments": "error",
    },
  },
)
