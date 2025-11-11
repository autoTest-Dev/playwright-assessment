import { Page,Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
    readonly productTitle: Locator;
    readonly booksCategory: Locator;
    readonly addToCartButtons: Locator;
    readonly addToCartSuccessMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.productTitle = page.locator('.product-title')
        this.booksCategory = page.locator('a[href="/books"]');
        this.addToCartButtons = page.locator('input[value="Add to cart"]');
        this.addToCartSuccessMsg = page.locator('.content')
    }

    async validateWelcomeToStoreText() {
      await this.page.getByText('Welcome to our store').isVisible();
    }

    async navigateToBooksCategory() {
      await this.booksCategory.first().click();
    }
    
    async addProductToCart(index: number) {
    await this.addToCartButtons.nth(index).click();
    await this.addToCartSuccessMsg.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);
  }
    
}