import { test, expect } from '@playwright/test';

// 1) LOGIN TEST
test('Login test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await expect(page.locator('h2')).toHaveText('Login Page');

  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/.*\/secure/);
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  await page.click('a[href="/logout"]');
});

// 2) DROPDOWN TEST
test('Dropdown selection', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');
  const dropdown = page.locator('#dropdown');

  await dropdown.selectOption('1');
  await expect(dropdown).toHaveValue('1');

  await dropdown.selectOption('2');
  await expect(dropdown).toHaveValue('2');
});

// 3) CHECKBOX TEST
test('Checkbox selection', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');
  const checkboxes = page.locator('input[type="checkbox"]');

  await expect(checkboxes.nth(0)).not.toBeChecked();
  await checkboxes.nth(0).check();
  await expect(checkboxes.nth(0)).toBeChecked();

  await expect(checkboxes.nth(1)).toBeChecked();
  await checkboxes.nth(1).uncheck();
  await expect(checkboxes.nth(1)).not.toBeChecked();
});

// 4) FILE UPLOAD TEST
test('File upload', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');
  await page.setInputFiles('#file-upload', 'sample.txt');
  await page.click('#file-submit');
  await expect(page.locator('h3')).toHaveText('File Uploaded!');
});

// 5) ALERT HANDLING TEST
test('JavaScript alerts', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.once('dialog', dialog => dialog.accept());
  await page.click('text=Click for JS Alert');
  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');

  page.once('dialog', dialog => dialog.accept('Hello'));
  await page.click('text=Click for JS Prompt');
  await expect(page.locator('#result')).toContainText('Hello');
});
