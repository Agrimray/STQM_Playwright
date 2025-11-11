import { test, expect } from '@playwright/test';

test('Homepage Title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
});
