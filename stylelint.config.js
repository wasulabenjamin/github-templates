/*
 * Wasula Benjamin, Copyright (c) 2025
 * Contact : wasulabenjamin@gmail.com
 *
 * Project Name  : github-templates
 * File Name     : stylelint.config.js
 * Last Modified : 2025-12-01, 10:22am
 */

// -------------------------------------------------------------
// StyleLint flat config (v9+) compatible with ESM projects
// Node >=20.x
// This config lints CSS, SCSS, and VUE files with recommended rules
// -------------------------------------------------------------

import standard from 'stylelint-config-standard';
import standardScss from 'stylelint-config-standard-scss';
import recommendedVue from 'stylelint-config-recommended-vue';
import stylelintScss from 'stylelint-scss';

// noinspection JSUnusedGlobalSymbols
export default {
  // Root file types Stylelint should consider
  files: ['**/*.{css,scss,vue}'],

  // Extend recommended modern presets
  extends: [
    recommendedVue, // Vue SFC support
    standard, // Base CSS
    standardScss, // SCSS support
  ],

  // Plugins for SCSS rules
  plugins: [stylelintScss],

  rules: {
    // ==================== CORE CSS RULES ====================
    'color-no-invalid-hex': true,
    'unit-no-unknown': true,
    'block-no-empty': true,

    // ==================== SELECTOR RULES ====================
    'selector-class-pattern': null, // Allow any class naming convention
    'selector-id-pattern': null, // Allow any ID naming convention
    'selector-no-qualifying-type': null,

    // ==================== CUSTOM PROPERTIES ====================
    'custom-property-pattern': null,
    'custom-property-no-missing-var-function': true,

    // ==================== COLOR ====================
    'color-hex-length': 'short',

    // ==================== FONT ====================
    'font-family-name-quotes': 'always-where-required',
    'font-weight-notation': 'numeric',

    // ==================== DECLARATIONS ====================
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-redundant-longhand-properties': null,

    // ==================== VUE-SPECIFIC ====================
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep', 'global', 'slotted'] }],
    'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'] }],

    // ==================== SCSS RULES ====================
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          // SCSS directives
          'debug',
          'each',
          'else',
          'error',
          'for',
          'function',
          'if',
          'include',
          'mixin',
          'return',
          'warn',
          'while',
          // Tailwind directives (if using Tailwind)
          'apply',
          'responsive',
          'screen',
          'tailwind',
          'variants',
          // PostCSS directives
          'add-mixin',
          'define-mixin',
        ],
      },
    ],
    'scss/at-rule-no-unknown': true, // plugin-based
    'scss/dollar-variable-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'scss/percent-placeholder-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',

    // ==================== PROPERTY VALIDATION ====================
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'composes', // CSS Modules
          'container', // Container queries
          'font-palette', // Font palette
        ],
      },
    ],

    // ==================== ACCESSIBILITY & BEST PRACTICES ====================
    'declaration-no-important': null, // Allow !important with caution

    // ==================== COMPATIBILITY RULES ====================
    'no-descending-specificity': null, // Allow descending specificity
  },

  // ==================== FILE-SPECIFIC OVERRIDES ====================
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
      rules: {
        // Vue-specific rule adjustments
        'scss/operator-no-unspaced': null,
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['deep', 'global', 'slotted', 'export'],
          },
        ],
      },
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
      rules: {
        // SCSS-specific rule adjustments
        'scss/dollar-variable-pattern': null, // More permissive in SCSS files
      },
    },
    {
      files: ['**/*.css'],
      rules: {
        // CSS-specific rule adjustments
        'at-rule-no-unknown': true, // Strict for plain CSS
      },
    },
  ],

  // ==================== IGNORE PATTERNS ====================
  ignoreFiles: [
    'node_modules/**',
    'dist/**',
    'build/**',
    '**/generated/**',
    '**/*.{js,jsx,ts,tsx,min.css}',
    '**/coverage/**',
    '**/.nuxt/**',
    '**/.next/**',
    '**/.output/**',
  ],
};
