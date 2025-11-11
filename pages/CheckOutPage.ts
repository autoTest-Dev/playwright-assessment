import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly billingContinueButton: Locator;
  readonly shippingContinueButton: Locator;
  readonly shippingMethodContinueButton: Locator;
  readonly paymentMethodCOD: Locator;
  readonly paymentContinueButton: Locator;
  readonly paymentInfoContinueButton: Locator;
  readonly confirmButton: Locator;
  readonly successMessage: Locator;
  readonly orderNumber: Locator;

  constructor(page: Page) {
    super(page);
    this.billingContinueButton = page.locator('#billing-buttons-container input[value="Continue"]');
    this.shippingContinueButton = page.locator('#shipping-buttons-container input[value="Continue"]');
    this.shippingMethodContinueButton = page.locator('#shipping-method-buttons-container input[value="Continue"]');
    this.paymentMethodCOD = page.locator('#paymentmethod_0');
    this.paymentContinueButton = page.locator('#payment-method-buttons-container input[value="Continue"]');
    this.paymentInfoContinueButton = page.locator('#payment-info-buttons-container input[value="Continue"]');
    this.confirmButton = page.locator('#confirm-order-buttons-container input[value="Confirm"]');
    this.successMessage = page.locator('.section.order-completed .title');
    this.orderNumber = page.locator('.details li');
  }

  async completeBillingAddress(){
    await this.billingContinueButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.billingContinueButton.click();
    await this.page.waitForTimeout(1000);
  }

  async completeShippingAddress() {
    await this.shippingContinueButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.shippingContinueButton.click();
    await this.page.waitForTimeout(1000);
  }

  async selectShippingMethod() {
    await this.shippingMethodContinueButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.shippingMethodContinueButton.click();
    await this.page.waitForTimeout(1000);
  }

  async selectPaymentMethod() {
    await this.paymentMethodCOD.waitFor({ state: 'visible', timeout: 10000 });
    await this.paymentMethodCOD.check();
    await this.paymentContinueButton.click();
    await this.page.waitForTimeout(1000);
  }

  async completePaymentInfo() {
    await this.paymentInfoContinueButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.paymentInfoContinueButton.click();
    await this.page.waitForTimeout(1000);
  }

  async confirmOrder() {
    await this.confirmButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.confirmButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async completeCheckout() {
    await this.completeBillingAddress();
    await this.completeShippingAddress();
    await this.selectShippingMethod();
    await this.selectPaymentMethod();
    await this.completePaymentInfo();
    await this.confirmOrder();
  }

  async getSuccessMessage() {
    await this.successMessage.waitFor({ state: 'visible', timeout: 10000 });
    return await this.successMessage.textContent() || '';
  }

  async getOrderNumber() {
    let orderNumber = '';
    const orderText = await this.orderNumber.first().textContent();
    if(orderText) {
    orderNumber = orderText.split(':')[1].trim();
    }
    return orderNumber;
  }
}