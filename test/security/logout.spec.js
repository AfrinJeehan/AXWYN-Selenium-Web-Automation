const assert = require('node:assert/strict');
const { By } = require('../../src/core/base-page');
const config = require('../../config');
const { HomePage } = require('../../src/pages/home.page');
const { SignInPage } = require('../../src/pages/signin.page');
const { loginExistingUser } = require('../support/fixtures');
const { requireConfiguredLogin } = require('../../src/utils/preconditions');

describe('AXWYN Logout Security', function () {
  it('logs out and blocks authenticated content after logout', async function () {
    this.timeout(120000);
    requireConfiguredLogin();
    await loginExistingUser();

    const h = new HomePage(driver());
    await h.clickText('Logout');

    const signIn = new SignInPage(driver());
    await signIn.assertAnyText([/sign in/i, /email/i]);

    await driver().get(`${config.baseUrl}/profile`);
    const body = await driver().findElement(By.css('body')).getText();
    assert.match(body, /sign in|login/i);
  });
});

function driver() {
  return global.__axwynDriver;
}
