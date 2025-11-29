/*
 * Wasula Benjamin, Copyright (c) 2025
 * Contact : wasulabenjamin@gmail.com
 *
 * Project Name  : github-templates
 * File Name     : eslint.config.js
 * Last Modified : 2025-11-27, 03:21pm
 */

// -------------------------------------------------------------
// ESLint flat config (v9+) compatible with ESM projects
// Node >=20.x
// This config lints JS,TS, and VUE files with recommended rules
// -------------------------------------------------------------

import globals from 'globals'; // Standard global variables
import typescriptParser from '@typescript-eslint/parser'; // TypeScript parser
import typescriptPlugin from '@typescript-eslint/eslint-plugin'; // TypeScript rules
import vueParser from 'vue-eslint-parser'; // Vue SFC parser
import vuePlugin from 'eslint-plugin-vue'; // Vue rules

export default [
  // ============================================================
  // 1. BASE JAVASCRIPT CONFIG
  // ============================================================
  {
    // Apply to all JS/MJS files
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],

    languageOptions: {
      ecmaVersion: 'latest', // Latest ECMAScript features
      sourceType: 'module', // ES modules
      globals: {
        ...globals.browser, // Browser globals like window, document
        ...globals.node, // Node.js globals like process, require
        ...globals.es2022, // ES2022 globals
      },
    },

    // Rules from @eslint/js (recommended subset manually applied)
    rules: {
      'no-unused-vars': 'warn', // Warn when variables are declared but not used
      'no-console': 'off', // Allow console.log, console.error, etc.
      'no-debugger': 'warn', // Warn on debugger statements
      'prefer-const': 'warn', // Suggest using const over let when possible
      eqeqeq: 'error', // Enforce strict equality ===
      'no-var': 'error', // Disallow var
      curly: 'error', // Require curly braces for all blocks
    },
  },

  // ============================================================
  // 2. TYPESCRIPT CONFIG
  // ============================================================
  {
    // Apply to all TS files
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parser: typescriptParser, // Use TypeScript parser
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },

    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },

    // TypeScript rules (manually defined, no extends)
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'no-console': 'off', // Allow console in TS as well
      'no-debugger': 'warn',
    },
  },

  // ============================================================
  // 3. VUE 3 CONFIG
  // ============================================================
  {
    // Apply to all Vue SFCs
    files: ['**/*.vue'],

    languageOptions: {
      parser: vueParser, // Vue SFC parser
      parserOptions: {
        parser: typescriptParser, // Use TS parser for <script setup> or <script lang="ts">
        extraFileExtensions: ['.vue'], // Recognize .vue files
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },

    plugins: {
      vue: vuePlugin,
    },

    // Vue rules manually defined
    rules: {
      'vue/multi-word-component-names': 'off', // Disable mandatory multi-word component names
      'vue/attributes-order': 'error', // Enforce ordering of attributes
      'vue/order-in-components': 'error', // Enforce order of properties in components
      'vue/no-v-html': 'warn', // Warn against use of v-html
      'vue/html-closing-bracket-newline': 'warn', // Enforce line breaks on closing brackets
      'vue/html-self-closing': [
        'warn', // Self-closing style for void elements
        {
          html: {
            void: 'any', // allow <img> OR <img />
            normal: 'never',
            component: 'always',
          },
        },
      ],
    },
  },

  // ============================================================
  // 4. NODE / SERVER CONFIG
  // ============================================================
  {
    files: ['src/server/**/*.js', 'src/server/**/*.ts', 'src/api/**/*.ts'],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      'no-console': 'off', // Allow console in server files
      '@typescript-eslint/no-var-requires': 'off', // Allow require in TS server files
    },
  },

  // ============================================================
  // 5. CONFIG FILES (ESLint, Vite, etc.)
  // ============================================================
  {
    files: ['*.config.js', '*.config.ts', 'vite.config.*', 'eslint.config.js'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'import/extensions': 'off', // Disable import extension checks
    },
  },

  // ============================================================
  // 6. IGNORE PATTERNS
  // ============================================================
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '*.min.js', '**/generated/**'],
  },
];
