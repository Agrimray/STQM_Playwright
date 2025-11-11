import { test, expect } from '@playwright/test';

test('Remove from Cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('text=Add to cart');
  await page.click('text=Remove');
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});
