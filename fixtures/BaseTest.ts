import { Page } from '@playwright/test';
import { HeaderPage } from '../pages/HeaderPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { BasePage } from '../pages/BasePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckOutPage';

export class BaseTest {
  readonly page: Page;
  readonly basePage: BasePage;
  readonly loginPage: LoginPage;
  readonly headerPage: HeaderPage;
  readonly productPage: ProductPage;
  readonly cartPage: CartPage;
  readonly checkOutPage: CheckoutPage;


  constructor(page: Page) {
    this.page = page;

    // Initialize all page objects here
    this.basePage = new BasePage(page);
    this.loginPage = new LoginPage(page);
    this.headerPage = new HeaderPage(page);
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
    this.checkOutPage = new CheckoutPage(page);
    
  }
}