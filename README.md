# STQM_Playwright
Playwright Automation Testing  Comprehensive Technical Manual

Authors: Agrim Ray, Shivam Babu
Tool: Microsoft Playwright
Purpose: This document serves as a complete technical reference for Playwright-based end-to-end testing automation, including architecture, setup, command usage, CI/CD integration, and sample test cases.
 
1. Introduction

Playwright is an open-source automation framework developed by Microsoft. It allows Quality Assurance (QA) engineers and developers to automate browsers for testing modern web applications. The framework supports scripting in JavaScript, TypeScript, Python, Java, and .NET, making it versatile across multiple development ecosystems.

Playwright’s design provides deterministic test execution, ensuring that flaky tests caused by race conditions are minimized. It also supports mobile device emulation, network interception, and native multi-tab testing.
2. Why Choose Playwright

Playwright provides a superior automation experience compared to traditional tools such as Selenium or Cypress due to its native browser control, automatic waits, and multi-language support. It is optimized for CI/CD pipelines, headless testing, and complex user workflows.
Feature Comparison:
Feature	Playwright	Selenium	Cypress
Cross-Browser Testing	 Yes (Chromium, Firefox, WebKit)	 Yes (All major browsers)	 Partial (Mainly Chromium)
Parallel Execution	 Built-in with Test Runner	 Requires Selenium Grid	 Limited
Mobile Emulation	 Native via Browser Context	 Requires Add-ons or Chrome DevTools	 Partial Support
Headless Mode	 Built-in	 Built-in	 Built-in
Multi-Tab / Multi-Context Support	 Fully Supported	Partial	Not Supported
Language Support	JavaScript, TypeScript, Python, Java, .NET	Multiple (Java, Python, JS, C#, Ruby)	JavaScript Only
Network Interception	 Built-in	Limited via Plugins	Partial
Auto-Wait for Elements	 Native Auto-Wait Mechanism	 Manual Waits Required	 Built-in
Test Isolation (BrowserContext)	 Built-in	 Requires Manual Handling	 Shared Browser State
CI/CD Integration	 Full Native Support (GitHub, Jenkins, GitLab)	 Supported	 Supported
Video & Screenshot Capture	 Native Support	Requires Third-party Libraries	 Built-in
Trace Viewer	 Built-in Trace Tool	 Not Available	Limited
API Testing Capability	 Supported	Partial via REST Clients	 Supported
Execution Speed	Very Fast (Direct Browser API)	Moderate (WebDriver layer)	Fast
Best Use Case	Modern Web Apps, CI/CD, Cross-Browser Testing	Legacy Support, Large Teams	Frontend Testing & Component Testing
3. Installation & Setup
1.	Prerequisites 
a.	Node.js 18+
b.	npm 8+
c.	Supported OS: Windows, Linux, macOS
2.	Commands
a.	npm init playwright@latest
b.	npx playwright install
c.	npx playwright test –ui
d.	npx playwright test –headed
e.	npx playwright test --project=chromium
f.	npx playwright test --reporter=html
g.	npx playwright show-report
S.No	Command	Description / Function	Expected Outcome / Example Output
a.	npm init playwright@latest	Initializes a new Playwright testing project. Installs dependencies, creates test folder structure, and configuration files.	Creates /tests/, playwright.config.ts, and installs required browsers.
b.	npx playwright install	Installs the latest stable versions of Chromium, Firefox, and WebKit browsers used by Playwright.	Downloads browsers and confirms installation via terminal.
c.	npx playwright test --ui	Launches Playwright’s interactive test runner UI, allowing you to explore, debug, and run tests visually.	Opens graphical test dashboard to run tests manually.
d.	npx playwright test --headed	Runs all Playwright tests in headed mode (with browser visible). Useful for debugging test steps visually.	Opens browser window showing test execution in real time.
e.	npx playwright test --project=chromium	Executes tests on a specific browser engine (here, Chromium). Other options: firefox or webkit.	Runs tests only in the chosen browser project defined in config.
f.	npx playwright test --reporter=html	Runs all tests and generates a detailed HTML test report in the /playwright-report directory.	Produces structured visual report including screenshots and logs.
g.	npx playwright show-report	Opens the most recently generated HTML report in the default browser.	Displays full execution summary, pass/fail details, and traces.
3.	Expected Output: Project initialized with default configuration.
Browsers installed (Chromium, Firefox, WebKit).
Test runner available via `npx playwright test.
  
4. Internal Architecture

 
Playwright uses a layered architecture to ensure reliable communication between the test script and the browser instance.

1. Client Libraries (Language Bindings)
Languages Supported: JavaScript / TypeScript, Python, Java, .NET
These libraries expose high-level APIs to testers and developers.
Typical commands include:
•	page.goto(url) → navigates to a web page
•	page.click(selector) → clicks an element
•	page.locator(selector) → finds and interacts with UI components
Each API call made through these bindings is translated into a structured command that the Playwright Driver can interpret.
Key Roles:
•	Provide a consistent interface across languages
•	Hide low-level protocol complexities
•	Send automation instructions asynchronously to the Playwright Driver
2. Playwright Driver (Core Engine)
This is the heart of Playwright — a Node.js-based binary that receives API calls from the client libraries and converts them into browser-specific protocol messages.
Responsibilities:
•	Converts language-level commands (e.g., page.click()) into browser protocol instructions.
•	Manages timeouts, auto-waiting, and event synchronization to eliminate flaky tests.
•	Controls trace recording, network mocking, and execution context isolation.
Key Advantage:
The Driver doesn’t depend on third-party WebDrivers (unlike Selenium). Instead, it directly speaks the browser’s native DevTools protocol (CDP), improving speed and stability.
3. Transport Layer (WebSocket / JSON RPC Channel)
This layer forms the bi-directional communication link between the Playwright Driver and the actual browser process.
Characteristics:
•	Uses WebSocket or JSON-RPC protocol for message exchange.
•	Allows continuous streaming of commands, responses, logs, and browser events.
•	Captures console logs, network requests/responses, DOM events, and errors in real time.
Purpose:
It ensures Playwright can run browsers remotely (e.g., in containers or cloud CI runners) while keeping performance nearly identical to local execution.
4. Browsers (Engines)
Playwright supports the three major browser rendering engines:
•	Chromium (used by Chrome and Edge)
•	Firefox
•	WebKit (used by Safari)
Browser Management Features:
•	Each browser version is pinned to a known revision for consistency in test results.
•	Can run in headless (no GUI) or headed (visible window) modes.
•	Automatically updates when the framework is upgraded.
Benefit:
This ensures your tests behave identically on all systems, avoiding discrepancies from local browser updates.
5. Isolation Model (Browser → Context → Page → Frame → ElementHandle/Locator)
This is Playwright’s unique multi-layer test isolation hierarchy:
Level	Description	Purpose
Browser	The top-level process managing a single browser instance (e.g., Chromium).	Shared process across multiple contexts.
BrowserContext	A fresh, isolated browser profile (like a separate incognito session).	Ensures test independence — no cache or cookies are shared.
Page	A single tab inside a BrowserContext.	Represents one test session; can be navigated independently.
Frame	An embedded document inside a Page (e.g., iframes).	Enables multi-frame testing within one page.
ElementHandle / Locator	A pointer to a specific DOM element or query selector.	Used to perform UI actions (clicks, inputs, validations).
Example:
A single test can open multiple Pages in one BrowserContext (e.g., for chat or multi-tab flows) while other tests run parallel contexts without interference.
6. Test Runner & Workers
Playwright comes with its own built-in test runner, known as @playwright/test.
Key Components:
•	Workers: Independent test execution threads; each runs in its own process and BrowserContext.
•	Projects: Define different environments or browsers (e.g., one for Chrome, one for Firefox).
•	Fixtures: Shared setup/teardown logic for reusable test data and browser sessions.
•	Parallel Execution: Tests are distributed across workers automatically for faster execution.
Example Workflow:
1.	The runner discovers all test files (*.spec.ts).
2.	Each test is assigned to a worker.
3.	The worker launches a fresh context and executes tests.
4.	Reports, traces, and screenshots are collected asynchronously.
5. Recommended Project Structure
Typical Playwright project directory:
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

 
Inside the tests Folder we write test case
 
6. Core Functions

   
7. Demonstration Test Cases

Below are demonstration test cases inspired by the Swag Labs (SauceDemo) application, illustrating practical automation workflows.

7.1 Title Verification

test('Homepage Title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
});
7.2 Valid Login

test('Valid Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
});

7.3 Invalid Login

test('Invalid Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'wrong_user');
  await page.fill('#password', 'wrong_pass');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText(/Epic sadface/);
});


7.4 Sorting, Cart, and Checkout Tests
Includes product sorting, add-to-cart, remove-from-cart, responsive layout checks, and complete checkout verification.
test('Sort Products', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');					      await page.fill('#user-name', 'standard_user');
await page.fill('#password', 'secret_sauce');						       await page.click('#login-button');							     await page.selectOption('.product_sort_container', 'lohi');					 await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');
});
https://github.com/Agrimray/STQM_Playwright
8. CI/CD Integration Example

Example workflow for GitHub Actions integration:

yaml
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


9. Troubleshooting Guide


Problem	Cause	Resolution
TimeoutError	Network delay	Increase the timeout value in the configuration file
Locator not found	Incorrect selector	Use page.locator() with correct selector and ensure element visibility
Headless mode fails	Environment issue	Run tests in --headed mode for debugging
HTML report missing	Report path issue	Re-run using npx playwright show-report


10. References & Sources

1. Microsoft Playwright Documentation: https://playwright.dev/
2. Playwright GitHub Repository: https://github.com/microsoft/playwright
3. BrowserStack Playwright vs Selenium: https://www.browserstack.com/guide/playwright-vs-selenium
4. SauceDemo Sample App: https://www.saucedemo.com/
5. Martin Fowler - Testing Best Practices: https://martinfowler.com/articles/practical-test-pyramid.html
6. Playwright CI/CD Integration Docs: https://playwright.dev/docs/ci
7. Medium: Advanced Playwright Testing Setup – https://medium.com/testvagrant

