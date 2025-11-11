import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  /** Get current page title */
  async getPageTitle(){
    return await this.page.title();
  }

  /** Get visible text from a locator */
  async getText(locator: Locator) {
    return await locator.textContent();
  }

  async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /** Fill input after ensuring it's visible */
  async fillInput(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  /** Verify element contains expected text */
  async verifyText(locator: Locator, expected: string) {
    await expect(locator).toHaveText(expected);
  }

  /** Wait for element to be visible */
  async waitForVisible(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
  }

  /** Verify page title */
  async verifyPageTitle(expectedTitle: string) {
    const actualTitle = await this.getPageTitle();
    await expect(actualTitle, `Expected page title to be "${expectedTitle}" but got "${actualTitle}"`)
    .toBe(expectedTitle);
  }
}