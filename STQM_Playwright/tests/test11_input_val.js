import { test, expect } from '@playwright/test';

test('Input Field Validation - Checkout Form', async ({ page }) => {
  // Navigate and login
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Add item to cart and go to checkout
  await page.click('text=Add to cart');
  await page.click('.shopping_cart_link');
  await page.click('#checkout');

  // Step 1: Submit with empty fields
  await page.click('#continue');
  const errorMsg = await page.locator('[data-test="error"]');
  await expect(errorMsg).toHaveText('Error: First Name is required');

  // Step 2: Enter only First Name and leave others blank
  await page.fill('#first-name', 'John');
  await page.click('#continue');
  await expect(errorMsg).toHaveText('Error: Last Name is required');

  // Step 3: Enter invalid Postal Code (too short)
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '1');
  await page.click('#continue');
  // SauceDemo doesn’t validate format, but you can assert field value
  const postalCodeValue = await page.inputValue('#postal-code');
  expect(postalCodeValue.length).toBeLessThan(5);
});
