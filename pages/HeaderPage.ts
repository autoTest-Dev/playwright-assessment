import { Page,Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HeaderPage extends BasePage{
    readonly headerLogo: Locator;
    readonly loginBtn: Locator;
    readonly accountId:Locator;
    readonly logOut: Locator;
    readonly cartQuantity: Locator;
    readonly cart: Locator;


    constructor(page: Page) {
        super(page);
        this.headerLogo = page.locator('.header-logo');
        this.loginBtn = page.locator('a[href="/login"]');
        this.accountId = page.locator('a.account');
        this.logOut = page.locator('a[href="/logout"]');
        this.cart = page.locator('a.ico-cart');
        this.cartQuantity = page.locator('span.cart-qty');
        
    }

    async verifyLoginPageTitle() {
      await this.verifyPageTitle('Demo Web Shop. Login');
    }

    async getLoggedInEmail() {
      return await this.accountId.first().textContent();
    }

  async clickLogin() {
    await this.loginBtn.waitFor({ state: 'visible', timeout: 1000 });
    await this.loginBtn.click();
  }

  async clickLogout() {
    await this.logOut.waitFor({ state: 'visible', timeout: 1000 });
    await this.logOut.click();
  }

  async getCartQuantity() {
    await this.cartQuantity.waitFor();
    return this.cartQuantity.textContent();
  }

  async navigateToCart() {
    return this.cart.first().click();
  }
    
}