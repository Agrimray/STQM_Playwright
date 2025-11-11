// test10_checkout_flow.js
import { test, expect } from '@playwright/test';

test('Checkout Flow', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('text=Add to cart');
  await page.click('.shopping_cart_link');
  await page.click('#checkout');
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');
  await page.click('#finish');
  await expect(page.locator('.complete-header')).toHaveText('THANK YOU FOR YOUR ORDER');
});




test('Homepage Title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
});


// test2_valid_login.js


test('Valid Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
});


// test3_invalid_login.js


test('Invalid Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'wrong_user');
  await page.fill('#password', 'wrong_pass');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText(/Epic sadface/);
});


// test4_sort_products.js


test('Sort Products', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.selectOption('.product_sort_container', 'lohi');
  await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');
});


// test5_add_to_cart.js


test('Add to Cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('text=Add to cart');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});


// test6_remove_from_cart.js


test('Remove from Cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('text=Add to cart');
  await page.click('text=Remove');
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});


// test7_menu_navigation.js

test('Menu Navigation', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#react-burger-menu-btn');
  await expect(page.locator('.bm-item-list')).toBeVisible();
});


// test8_product_details.js


test('Product Details', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('.inventory_item_name');
  await expect(page.locator('.inventory_details_name')).toBeVisible();
});


// test9_responsive_design.js


test('Responsive Layout', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('#login-button')).toBeVisible();
});

//Input Validation


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

  // Wait for First Name field
  await page.waitForSelector('#first-name');

  // Step 1: Submit with empty fields
  await page.click('#continue');
  const errorMsg = page.locator('[data-test="error"]');
  await expect(errorMsg).toHaveText('Error: First Name is required');

  // Step 2: Enter only First Name
  await page.fill('#first-name', 'John');
  await page.click('#continue');
  await expect(errorMsg).toHaveText('Error: Last Name is required');

  // Step 3: Enter Last Name and invalid Postal Code
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '1');

  // ✅ Validate length BEFORE continuing
  const postalCodeValue = await page.inputValue('#postal-code');
  expect(postalCodeValue.length).toBeLessThan(5);

  // Click Continue (it will go to next page now)
  await page.click('#continue');
});
