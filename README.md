This repository contains an automated testing framework built using Playwright with TypeScript.  
It includes page object models, reusable utilities, fixtures, and a custom JSON reporter for structured test reporting.

Project Structure

Playwright-AssessMent/
├── tests/
│   └── ecommerce.spec.ts          # Single comprehensive test case
├── pages/
|   ├── BasePage.ts                 # Base page
|   ├── HeaderPage.ts               # Header page object
│   ├── LoginPage.ts                # Login page object
│   ├── ProductsPage.ts             # Products page object
│   ├── CartPage.ts                 # Cart page object
│   └── CheckoutPage.ts             # Checkout page object
├── fixtures/BaseTest.ts            # Base test fixture with page objects
├── data/ecommerceData.ts           # Test data configuration                   
├── reporters/
│   └── CustomJsonReport.ts         # Custom JSON reporter
├── test-result/                    # contains JSON report 
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies
└── README.md                       # This file

SetUp - 
Clone the project - 
git clone https://github.com/autoTest-Dev/playwright-assessment.git
cd playwright-assessment

install dependencies 
npm install
install playwright
npx playwright install

Execution Instructions - 
Run all tests (default - headless)
npx playwright test

Run tests in headed mode (visible browser)
npx playwright test --headed