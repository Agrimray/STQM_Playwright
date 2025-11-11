import { test, expect } from '@playwright/test';

test('Add to Cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('text=Add to cart');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
