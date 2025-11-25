/*
 * Wasula Benjamin, Copyright (c) 2025
 * Contact : wasulabenjamin@gmail.com
 *
 * Project Name  : github-templates
 * File Name     : stylelint.config.js
 * Last Modified : 2025-11-25, 08:00pm
 */

// noinspection JSUnusedGlobalSymbols
export default {
  // Files to lint
  files: ['**/*.{css,scss}'],

  // Base rules
  extends: ['stylelint-config-standard-scss'],

  // Plugins
  plugins: ['stylelint-scss'],

  // Custom rules (optional, add as needed)
  rules: {
    // Example rules:
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-properties': true,
    'block-no-empty': true,

    // SCSS-specific rules
    'scss/dollar-variable-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'scss/percent-placeholder-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'scss/at-rule-no-unknown': true,
  },

  // Ignore node_modules
  ignoreFiles: ['node_modules/**'],
};
