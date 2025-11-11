
# 🧩 Playwright Automation Testing – Comprehensive Technical Manual

**Authors:** Agrim Ray, Shivam Babu
**Tool:** Microsoft Playwright
**Repository:** [STQM_Playwright](https://github.com/Agrimray/STQM_Playwright)

---

## 📘 Overview

This repository serves as a **complete technical reference** for end-to-end automation testing using **Microsoft Playwright**.
It covers the framework’s **architecture**, **setup**, **command usage**, **CI/CD integration**, and **practical test cases** based on real-world scenarios (Swag Labs).

Playwright is a modern, cross-browser testing framework supporting **JavaScript**, **TypeScript**, **Python**, **Java**, and **.NET**, designed to provide **deterministic**, **fast**, and **reliable** automation.

---

## 🚀 Why Choose Playwright

| Feature                      | Playwright                  | Selenium             | Cypress             |
| ---------------------------- | --------------------------- | -------------------- | ------------------- |
| **Cross-Browser Testing**    | ✅ Chromium, Firefox, WebKit | ✅ All major browsers | ⚠️ Mainly Chromium  |
| **Parallel Execution**       | ✅ Built-in                  | ⚙️ Requires Grid     | ⚠️ Limited          |
| **Mobile Emulation**         | ✅ Native                    | ⚙️ Chrome DevTools   | ⚠️ Partial          |
| **Multi-Tab Support**        | ✅ Full                      | ⚠️ Partial           | ❌ Not supported     |
| **Network Interception**     | ✅ Built-in                  | ⚙️ Plugins           | ⚠️ Partial          |
| **Language Support**         | JS, TS, Python, Java, .NET  | Multiple             | JS only             |
| **Test Isolation (Context)** | ✅ Built-in                  | ⚙️ Manual            | ⚠️ Shared           |
| **Trace Viewer**             | ✅ Built-in                  | ❌                    | ⚠️ Limited          |
| **Execution Speed**          | ⚡ Very Fast                 | 🕓 Moderate          | ⚡ Fast              |
| **Best Use Case**            | Modern Web Apps, CI/CD      | Legacy Systems       | Frontend Components |

---

## ⚙️ Installation & Setup

### 🧱 Prerequisites

* Node.js ≥ 18
* npm ≥ 8
* OS: Windows / Linux / macOS

### 🧰 Commands

| Command                                  | Description                                               | Example Output                                               |
| ---------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| `npm init playwright@latest`             | Initializes Playwright project and installs dependencies. | Creates `/tests/`, `playwright.config.ts`, installs browsers |
| `npx playwright install`                 | Installs Chromium, Firefox, and WebKit.                   | Browser binaries downloaded                                  |
| `npx playwright test --ui`               | Opens the interactive test runner UI.                     | Graphical dashboard opens                                    |
| `npx playwright test --headed`           | Runs tests with visible browser window.                   | Real-time execution shown                                    |
| `npx playwright test --project=chromium` | Runs tests only on Chromium.                              | Chrome tests executed                                        |
| `npx playwright test --reporter=html`    | Generates detailed HTML test report.                      | Report saved in `/playwright-report/`                        |
| `npx playwright show-report`             | Opens the last generated report.                          | HTML report launched in browser                              |

---

## 🧩 Internal Architecture

Playwright consists of multiple layers ensuring stable automation and consistent execution:

1. **Client Libraries** (JS, Python, Java, .NET)
   → High-level APIs (`page.goto()`, `page.click()`, etc.)

2. **Playwright Driver**
   → Converts API calls into native browser protocol commands (faster than Selenium WebDriver)

3. **Transport Layer**
   → Uses WebSocket / JSON-RPC to send commands between Driver and Browser

4. **Browsers**
   → Supports Chromium, Firefox, and WebKit; can run in headless or headed modes

5. **Isolation Model**

   | Level              | Description                | Purpose                  |
   | ------------------ | -------------------------- | ------------------------ |
   | **Browser**        | Manages a browser instance | Shared process           |
   | **BrowserContext** | Isolated browser profile   | Ensures clean test state |
   | **Page**           | A single browser tab       | Runs one test session    |
   | **Frame**          | Nested iframe              | Multi-frame testing      |
   | **Locator**        | Element reference          | UI interaction           |

6. **Test Runner & Workers**
   → Built-in runner handles fixtures, parallel execution, and automatic retries.

---

## 📁 Recommended Project Structure

```
project-root/
│
├── tests/
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│
├── pages/
│   ├── loginPage.ts
│   ├── productPage.ts
│   ├── checkoutPage.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## 🧪 Sample Test Cases

### ✅ 1. Homepage Title Verification

```typescript
test('Homepage Title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
});
```

### ✅ 2. Valid Login

```typescript
test('Valid Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
});
```

### ✅ 3. Invalid Login

```typescript
test('Invalid Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'wrong_user');
  await page.fill('#password', 'wrong_pass');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText(/Epic sadface/);
});
```

### ✅ 4. Product Sorting

```typescript
test('Sort Products', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.selectOption('.product_sort_container', 'lohi');
  await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');
});
```

---

## 🔄 CI/CD Integration Example (GitHub Actions)

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --reporter=html
      - run: npx playwright show-report
```

---

## 🧰 Troubleshooting Guide

| **Problem**         | **Cause**          | **Resolution**                              |
| ------------------- | ------------------ | ------------------------------------------- |
| TimeoutError        | Network delay      | Increase `timeout` in configuration         |
| Locator not found   | Incorrect selector | Use `page.locator()` with proper visibility |
| Headless mode fails | Environment issue  | Try `--headed` mode for debugging           |
| HTML report missing | Report path issue  | Re-run `npx playwright show-report`         |

---

## 📚 References & Sources

1. [Microsoft Playwright Documentation](https://playwright.dev/)
2. [Playwright GitHub Repository](https://github.com/microsoft/playwright)
3. [BrowserStack – Playwright vs Selenium](https://www.browserstack.com/guide/playwright-vs-selenium)
4. [SauceDemo Sample App](https://www.saucedemo.com/)
5. [Martin Fowler – Testing Best Practices](https://martinfowler.com/articles/practical-test-pyramid.html)
6. [Playwright CI/CD Integration Docs](https://playwright.dev/docs/ci)
7. [Advanced Playwright Testing Setup (Medium)](https://medium.com/testvagrant)

---



Would you like me to make this README **render GitHub badges** (e.g., Node.js version, Playwright version, build passing, etc.) at the top for a more polished look?
