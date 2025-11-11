import { test, expect } from '@playwright/test';
import {ecomData} from '../data/ecommerceData';
import { BaseTest } from '../fixtures/BaseTest';

test.describe('E-commerce Flow - Complete Purchase Journey', () => {

  test.beforeEach(async ({ page }) => {
    const baseUrl = test.info().project.use.baseURL!;
    // Navigate to the application
    await page.goto(`${baseUrl}`);
  });

  test('Complete e-commerce flow: Login, Add products, Verify cart, Complete checkout', async ({ page }) => {
    const baseTest = new BaseTest(page);

    // Step 1: Login with valid credentials
    await test.step('Login with valid credentials', async () => {
      await baseTest.headerPage.verifyPageTitle(ecomData.pagetitle);
      await baseTest.headerPage.clickLogin();
      await baseTest.loginPage.validateWelcomeText();
      await baseTest.loginPage.login(ecomData.email, ecomData.password);
      await baseTest.productPage.validateWelcomeToStoreText();

      const loggedInEmail = (await baseTest.headerPage.getLoggedInEmail()) ?? '';
      expect(loggedInEmail.toLowerCase())
        .toContain(ecomData.email.toLowerCase());
    });

    // Step 2: Add two products to the cart
    await test.step('Add two products to the cart', async () => {
      await baseTest.productPage.navigateToBooksCategory();

      for (const index of ecomData.products) {
        await baseTest.productPage.addProductToCart(index);
        console.log('Added product');
      }
    });

    // Step 3: Verify cart count and product details
    await test.step('Verify cart count and product details', async () => {

      // Navigate to cart page
      await baseTest.headerPage.navigateToCart();

      const cartItemCount = await baseTest.cartPage.getCartItemCount();
      expect(cartItemCount, 'Cart page should show 2 items').toBe(2);
      console.log('Cart page displays items');
    });

    // Step 4: Complete checkout and assert success message
    await test.step('Complete checkout and assert success message', async () => {
      await baseTest.cartPage.proceedToCheckout();
      console.log('Proceeding to checkout');

      await baseTest.checkOutPage.completeCheckout();
      console.log('Checkout process completed');

      const successMessage = await baseTest.checkOutPage.getSuccessMessage();
      expect(successMessage)
        .toContain(ecomData.orderSuccessExpectedMessage);
      console.log(`Success message verified: ${successMessage}`);

      const orderNumber = await baseTest.checkOutPage.getOrderNumber();
      expect(orderNumber, 'Order number should be generated').toBeTruthy();
      console.log(`Order completed successfully! ${orderNumber}`);

      await baseTest.headerPage.clickLogout();
      console.log('Logout successful');
    });
  });
});

