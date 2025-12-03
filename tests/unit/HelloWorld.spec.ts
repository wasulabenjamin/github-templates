/*
 * Wasula Benjamin, Copyright (c) 2025
 * Contact : wasulabenjamin@gmail.com
 *
 * Project Name  : github-templates
 * File Name     : HelloWorld.spec.ts
 * Last Modified : 2025-12-03, 03:05pm
 */

import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import HelloWorld from '../../src/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Test Message';
    const wrapper = mount(HelloWorld, {
      props: { msg },
    });

    expect(wrapper.text()).toContain(msg);
  });

  it('increments count when button is clicked', async () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Test' },
    });

    const button = wrapper.find('.btn-primary');
    expect(wrapper.text()).toContain('Template used 0 times');

    await button.trigger('click');
    expect(wrapper.text()).toContain('Template used 1 time');

    await button.trigger('click');
    expect(wrapper.text()).toContain('Template used 2 times');
  });

  it('toggles details visibility', async () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Test' },
    });

    const toggleButton = wrapper.find('.btn-secondary');
    expect(wrapper.find('.details-content').exists()).toBe(false);

    await toggleButton.trigger('click');
    expect(wrapper.find('.details-content').exists()).toBe(true);
    expect(wrapper.text()).toContain('Project structure highlights');

    await toggleButton.trigger('click');
    expect(wrapper.find('.details-content').exists()).toBe(false);
  });

  it('renders resource links correctly', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Test' },
    });

    const resourceCards = wrapper.findAll('.resource-card');
    expect(resourceCards).toHaveLength(4);

    const repositoryLink = resourceCards[0].attributes('href');
    expect(repositoryLink).toBe('https://github.com/wasulabenjamin/github-templates');
  });
});
