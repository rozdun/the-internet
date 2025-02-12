// eslint.config.mjs
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended, // Enable default JS rules
  {
    files: ["**/*.ts"], // Apply rules to TypeScript files
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": ts,
    },
    rules: {
      "@typescript-eslint/no-floating-promises": ["error", { "ignoreVoid": true }], // Ensure all promises are awaited
      "prefer-const": "warn", // Warn when let can be const
    },
  },
];
