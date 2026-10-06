const assert = require('node:assert/strict');
const config = require('../../config');
const { SignInPage } = require('../../src/pages/signin.page');
const { loginExistingUser } = require('../support/fixtures');
const { requireConfiguredLogin } = require('../../src/utils/preconditions');

describe('AXWYN Authentication', function () {
  it('shows the sign-in form', async () => {
    const p = new SignInPage(driver());
    await p.load();
    await p.assertAnyText([/sign in/i, /email/i, /password/i]);
  });

  it('rejects incorrect credentials', async () => {
    const p = new SignInPage(driver());
    await p.load();
    await p.signIn('invalid-user@example.invalid', 'Wrong!123');
    assert.ok(await p.hasText(/invalid|incorrect|failed|error|credentials|not valid|unable/i));
  });

  it('keeps Remember Me selected when enabled', async () => {
    const p = new SignInPage(driver());
    await p.load();
    assert.equal(await p.clickRememberMe(), true);
  });

  it('toggles password visibility when the control is available', async () => {
    const p = new SignInPage(driver());
    await p.load();
    await p.fillCredentials(config.login.email || 'qa@example.invalid', config.login.password || 'HiddenPassword!1');
    const result = await p.togglePasswordVisibility();
    if (result.after) assert.notEqual(result.before, result.after);
  });

  it('opens Sign Up', async () => {
    const p = new SignInPage(driver());
    await p.load();
    await p.clickSignUp();
    await p.assertAnyText([/register/i, /first name/i, /email/i]);
  });

  it('logs in using the configured existing AXWYN QA account', async function () {
    this.timeout(120000);
    requireConfiguredLogin();
    await loginExistingUser();
    assert.ok(await driver().findElement(require('selenium-webdriver').By.css('body')).getText()
      .then(t => /profile|logout|subscription|account|dashboard|verification/i.test(t)));
  });
});

function driver() {
  return global.__axwynDriver;
}
