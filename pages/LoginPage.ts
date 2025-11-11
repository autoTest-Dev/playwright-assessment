import { Page,Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton: Locator


    constructor(page: Page) {
        super(page);
        this.email = page.locator('#Email');
        this.password = page.locator('#Password');
        this.loginButton = page.locator('input[value="Log in"]');
    }

    async validateWelcomeText() {
      await this.page.getByText('Welcome, Please Sign In!').isVisible();
    }
    
   async login(email: string, password: string){
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }
    
}