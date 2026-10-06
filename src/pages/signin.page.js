const { BasePage, By } = require('../core/base-page');

class SignInPage extends BasePage {
  async load() {
    return super.load('/sign-in');
  }

  emailLocators() {
    return [
      By.css('input[type="email"]'),
      By.css('input[name="email"]'),
      By.css('input[name*="email" i]'),
      By.css('input[id="email"]'),
      By.css('input[id*="email" i]'),
      By.css('input[autocomplete="email"]'),
      By.xpath('//input[contains(translate(@placeholder,"EMAIL","email"),"email")]'),
      By.xpath('//label[contains(translate(normalize-space(.),"EMAIL","email"),"email")]/following::input[1]'),
    ];
  }

  passwordLocators() {
    return [
      By.css('input[type="password"]'),
      By.css('input[name="password"]'),
      By.css('input[name*="password" i]'),
      By.css('input[id="password"]'),
      By.css('input[id*="password" i]'),
      By.css('input[autocomplete="current-password"]'),
      By.xpath('//input[contains(translate(@placeholder,"PASSWORD","password"),"password")]'),
      By.xpath('//label[contains(translate(normalize-space(.),"PASSWORD","password"),"password")]/following::input[1]'),
    ];
  }

  rememberLocators() {
    return [
      By.css('input[name*="remember" i]'),
      By.css('input[id*="remember" i]'),
      By.xpath('//label[contains(translate(normalize-space(.),"REMEMBER","remember"),"remember")]/input[1]'),
      By.xpath('//label[contains(translate(normalize-space(.),"REMEMBER","remember"),"remember")]/preceding::input[@type="checkbox"][1]'),
      By.xpath('//label[contains(translate(normalize-space(.),"REMEMBER","remember"),"remember")]/following::input[@type="checkbox"][1]'),
    ];
  }

  submitLocators() {
    return [
      By.css('button[type="submit"]'),
      By.css('input[type="submit"]'),
      By.xpath('//button[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"sign in")]'),
      By.xpath('//button[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"login")]'),
    ];
  }

  async fillCredentials(email, password) {
    await this.fill(this.emailLocators(), email);
    await this.fill(this.passwordLocators(), password);
  }

  async signIn(email, password) {
    await this.fillCredentials(email, password);
    await this.click(this.submitLocators());
  }

  async assertAuthenticatedState() {
    await this.assertAnyText([
      /dashboard/i,
      /profile/i,
      /logout/i,
      /subscription/i,
      /account/i,
      /mobile number/i,
      /verification/i,
    ]);
  }

  async clickRememberMe() {
    const e = await this.first(this.rememberLocators());
    if (!(await e.isSelected())) await e.click();
    return e.isSelected();
  }

  async togglePasswordVisibility() {
    const input = await this.first(this.passwordLocators());
    const before = await input.getAttribute('type');

    const nearbyButtons = [
      By.css('button[aria-label*="password" i]'),
      By.css('button[title*="password" i]'),
      By.css('button[data-testid*="password" i]'),
      By.xpath('//button[contains(@class,"password") or contains(@class,"visibility") or contains(@class,"eye")]'),
      By.xpath('//input[contains(@name,"password") or contains(@id,"password")]/following::button[1]'),
    ];

    try {
      const button = await this.first(nearbyButtons, 5000);
      await button.click();
      return { before, after: await input.getAttribute('type') };
    } catch (_) {
      return { before, after: null };
    }
  }

  async clickSignUp() {
    return this.click([
      By.xpath('//a[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"sign up")]'),
      By.xpath('//a[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"register")]'),
      By.xpath('//button[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"sign up")]'),
      By.xpath('//button[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"register")]'),
    ]);
  }
}

module.exports = { SignInPage };
