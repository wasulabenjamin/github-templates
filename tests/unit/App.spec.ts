/*
 * Wasula Benjamin, Copyright (c) 2025
 * Contact : wasulabenjamin@gmail.com
 *
 * Project Name  : github-templates
 * File Name     : App.spec.ts
 * Last Modified : 2025-12-03, 03:05pm
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../../src/App.vue';

describe('App.vue', () => {
  beforeEach(() => {
    // Clear localStorage mocks between tests
    vi.restoreAllMocks();
  });

  it('renders the main app structure', () => {
    const wrapper = mount(App);

    expect(wrapper.find('.site-header').exists()).toBe(true);
    expect(wrapper.find('.main-content').exists()).toBe(true);
    expect(wrapper.find('.site-footer').exists()).toBe(true);
  });

  it('toggles theme when theme button is clicked', async () => {
    const wrapper = mount(App);
    const themeToggle = wrapper.find('[data-test="theme-toggle"]');
    const themeText = wrapper.find('[data-test="theme-text"]');

    // Initial state should be light theme
    expect(themeText.text()).toBe('Dark');

    // Click theme toggle
    await themeToggle.trigger('click');

    // Should now show light theme (since we toggled to dark, the button shows "Light")
    expect(themeText.text()).toBe('Light');

    // Click again to toggle back
    await themeToggle.trigger('click');
    expect(themeText.text()).toBe('Dark');
  });

  it('persists theme preference in localStorage', async () => {
    const setItemMock = vi.fn();
    const getItemMock = vi.fn().mockReturnValue('light');

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: getItemMock,
        setItem: setItemMock,
      },
      writable: true,
    });

    const wrapper = mount(App);

    // Trigger theme toggle
    await wrapper.find('[data-test="theme-toggle"]').trigger('click');

    // Should save to localStorage
    expect(setItemMock).toHaveBeenCalledWith('theme', 'dark');
  });

  it('loads saved theme from localStorage on mount', async () => {
    const getItemMock = vi.fn().mockReturnValue('dark');

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: getItemMock,
        setItem: vi.fn(),
      },
      writable: true,
    });

    const wrapper = mount(App);

    // Should show light theme text because we're in dark mode
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-test="theme-text"]').text()).toBe('Light');
  });

  it('renders all main sections', () => {
    const wrapper = mount(App);

    expect(wrapper.find('.hero').exists()).toBe(true);
    expect(wrapper.find('.features').exists()).toBe(true);
    expect(wrapper.find('.workflows').exists()).toBe(true);
    expect(wrapper.find('.getting-started').exists()).toBe(true);
    expect(wrapper.find('.cta').exists()).toBe(true);
  });

  it('contains correct links', () => {
    const wrapper = mount(App);
    const links = wrapper.findAll('a');

    const repositoryLink = links.find(
      (link) => link.attributes('href') === 'https://github.com/wasulabenjamin/github-templates',
    );
    expect(repositoryLink?.exists()).toBe(true);

    const docsLink = links.find((link) => link.attributes('href') === './docs/USAGE_GUIDES/getting-started.md');
    expect(docsLink?.exists()).toBe(true);
  });

  it('applies dark theme class to document element', async () => {
    // Mock document
    const classList = {
      add: vi.fn(),
      remove: vi.fn(),
    };

    Object.defineProperty(document, 'documentElement', {
      value: {
        classList,
      },
      writable: true,
    });

    const wrapper = mount(App);

    // Trigger theme toggle to dark
    await wrapper.find('[data-test="theme-toggle"]').trigger('click');

    // Should add dark theme class
    expect(classList.add).toHaveBeenCalledWith('dark-theme');

    // Trigger theme toggle back to light
    await wrapper.find('[data-test="theme-toggle"]').trigger('click');

    // Should remove dark theme class
    expect(classList.remove).toHaveBeenCalledWith('dark-theme');
  });
});
