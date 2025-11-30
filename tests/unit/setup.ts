/*
 * Wasula Benjamin, Copyright (c) 2025
 * Contact : wasulabenjamin@gmail.com
 *
 * Project Name  : github-templates
 * File Name     : setup.ts
 * Last Modified : 2025-11-30, 05:12pm
 */

import { config } from '@vue/test-utils';
import { beforeAll } from 'vitest';

// Global setup for Vue Test Utils
beforeAll(() => {
  // Add any global configuration here
  config.global.stubs = {
    Transition: false,
    TransitionGroup: false,
  };
});
