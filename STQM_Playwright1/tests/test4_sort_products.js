import { test, expect } from '@playwright/test';

test('Sort Products', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.selectOption('.product_sort_container', 'lohi');
  await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');
});
