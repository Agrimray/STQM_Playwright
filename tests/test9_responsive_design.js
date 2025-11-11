import { test, expect } from '@playwright/test';

test('Responsive Layout', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('#login-button')).toBeVisible();
});
