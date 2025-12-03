/*
 * Wasula Benjamin, Copyright (c) 2025
 * Contact : wasulabenjamin@gmail.com
 *
 * Project Name  : github-templates
 * File Name     : app.spec.ts
 * Last Modified : 2025-12-03, 03:05pm
 */

import { expect, test } from '@playwright/test';

test.describe('GitHub Templates App', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/GitHub Templates/);

    // Check header
    await expect(page.locator('.site-title').first()).toContainText('GitHub Templates');

    // Check main sections
    await expect(page.locator('.hero-title')).toBeVisible();
    await expect(page.locator('.features')).toBeVisible();
    await expect(page.locator('.workflows')).toBeVisible();
  });

  test('should toggle theme', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('.theme-toggle');

    // Initial state should be light
    await expect(themeToggle).toContainText('Dark');

    // Toggle to dark mode
    await themeToggle.click();
    await expect(themeToggle).toContainText('Light');

    // Toggle back to light mode
    await themeToggle.click();
    await expect(themeToggle).toContainText('Dark');
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');

    // Test repository link
    const repositoryLink = page.locator('a[href="https://github.com/wasulabenjamin/github-templates"]').first();
    await expect(repositoryLink).toBeVisible();

    // Test documentation link
    const docsLink = page.locator('a[href="./docs/USAGE_GUIDES/getting-started.md"]').first();
    await expect(docsLink).toBeVisible();
  });

  test('should interact with HelloWorld component', async ({ page }) => {
    await page.goto('/');

    // Test counter button
    const counterButton = page.locator('.hello-world .btn-primary');
    await expect(counterButton).toContainText('Template used 0 times');

    await counterButton.click();
    await expect(counterButton).toContainText('Template used 1 time');

    await counterButton.click();
    await expect(counterButton).toContainText('Template used 2 times');

    // Test details toggle
    const detailsButton = page.locator('.hello-world .btn-secondary');
    await expect(detailsButton).toContainText('Show project details');

    await detailsButton.click();
    await expect(detailsButton).toContainText('Hide project details');
    await expect(page.locator('.details-content')).toBeVisible();

    await detailsButton.click();
    await expect(detailsButton).toContainText('Show project details');
    await expect(page.locator('.details-content')).not.toBeVisible();
  });

  test('should display all feature cards', async ({ page }) => {
    await page.goto('/');

    const featureCards = page.locator('.feature-card');
    await expect(featureCards).toHaveCount(6);

    // Check some specific features
    await expect(page.locator('text=Smart issue templates')).toBeVisible();
    await expect(page.locator('text=Automated workflows')).toBeVisible();
    await expect(page.locator('text=Community standards')).toBeVisible();
  });
});
