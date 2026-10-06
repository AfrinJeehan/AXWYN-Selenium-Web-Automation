const { BasePage, By } = require('../core/base-page');

class RegistrationPage extends BasePage {
  async load() {
    return super.load('/sign-up');
  }

  field(name, type) {
    const n = String(name).toLowerCase();
    const locators = [];
    if (type) locators.push(By.css(`input[type="${type}"]`));
    locators.push(
      By.css(`input[name="${n}"]`),
      By.css(`input[name*="${n}" i]`),
      By.css(`input[id="${n}"]`),
      By.css(`input[id*="${n}" i]`),
      By.css(`input[autocomplete*="${n}" i]`),
      By.xpath(`//label[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"${n}")]/following::input[1]`),
    );
    return locators;
  }

  confirmPasswordLocators() {
    return [
      By.css('input[name*="confirm" i]'),
      By.css('input[id*="confirm" i]'),
      By.css('input[placeholder*="confirm" i]'),
      By.xpath('//label[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"confirm")]/following::input[1]'),
    ];
  }

  async inputs() {
    return this.driver.findElements(By.css('input'));
  }

  async fillUser(u) {
    await this.fill(this.field('first', 'text'), u.firstName);
    await this.fill(this.field('last', 'text'), u.lastName);
    await this.fill(this.field('email', 'email'), u.email);
    await this.fill(this.field('password', 'password'), u.password);

    try {
      await this.fill(this.confirmPasswordLocators(), u.password, 5000);
    } catch (_) {}

    for (const [name, value] of [
      ['phone', u.phone],
      ['mobile', u.phone],
      ['street', u.street],
      ['address', u.street],
      ['suburb', u.suburb],
      ['city', u.suburb],
      ['postcode', u.postcode],
      ['postal', u.postcode],
      ['company', u.company],
    ]) {
      if (!value) continue;
      try {
        await this.fill(this.field(name), value, 3000);
        break;
      } catch (_) {}
    }

    // Accept only terms/privacy-style checkboxes; do not blindly check every checkbox.
    const consentLabels = await this.driver.findElements(
      By.xpath('//label[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"terms") or contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"privacy")]//input[@type="checkbox"] | //label[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"terms") or contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"privacy")]/preceding::input[@type="checkbox"][1] | //label[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"terms") or contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"privacy")]/following::input[@type="checkbox"][1]')
    );
    for (const checkbox of consentLabels) {
      if (!(await checkbox.isSelected().catch(() => false))) await checkbox.click().catch(() => {});
    }
  }

  async submit() {
    return this.click([
      By.css('button[type="submit"]'),
      By.css('input[type="submit"]'),
      By.xpath('//button[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"register")]'),
      By.xpath('//button[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"sign up")]'),
      By.xpath('//button[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"create account")]'),
    ]);
  }
}

module.exports = { RegistrationPage };
