import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage{
  readonly cartItems: Locator;
  readonly productNames: Locator;
  readonly termsCheckbox: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('tr.cart-item-row');
    this.productNames = page.locator('.product-name');
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');

  }

  async getCartItemCount(){
    await this.cartItems.first().waitFor();
    return await this.cartItems.count();
  }

  async proceedToCheckout(){
    await this.checkoutButton.isEnabled();
    await this.termsCheckbox.check();
    await this.checkoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}