import { test, expect } from '@playwright/test';

test('Product Details', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('.inventory_item_name');
  await expect(page.locator('.inventory_details_name')).toBeVisible();
});
