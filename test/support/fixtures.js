const { By } = require('selenium-webdriver');
const config = require('../../config');
const { buildUser, buildConfiguredLoginUser } = require('../../src/utils/test-user');
const { RegistrationPage } = require('../../src/pages/registration.page');
const { SignInPage } = require('../../src/pages/signin.page');
const { PricingPage } = require('../../src/pages/pricing.page');
const { InvoicePage } = require('../../src/pages/invoice.page');
const { PaymentPage } = require('../../src/pages/payment.page');
const { PaymentSuccessPage } = require('../../src/pages/payment-success.page');
const { verify } = require('../../src/services/outlook/email-verification');
const { requireMutating, requireConfiguredLogin } = require('../../src/utils/preconditions');

async function registerNewUser(user = buildUser()) {
  requireMutating();
  const r = new RegistrationPage(global.__axwynDriver);
  await r.load();
  await r.fillUser(user);
  await r.submit();
  await verify();
  return user;
}

async function loginUser(user = buildConfiguredLoginUser()) {
  requireConfiguredLogin();
  const p = new SignInPage(global.__axwynDriver);
  await p.load();
  await p.signIn(user.email, user.password);
  await p.assertAuthenticatedState();
  return user;
}

async function loginExistingUser() {
  return loginUser(buildConfiguredLoginUser());
}

async function choosePlan(plan) {
  const p = new PricingPage(global.__axwynDriver);
  await p.load();
  return p.choosePlan(plan);
}

async function createSubscribedUser(plan, billing) {
  requireMutating();
  const u = await registerNewUser();
  await loginUser(u);
  const p = new PricingPage(global.__axwynDriver);
  await p.load();
  await p.selectBillingPeriod(billing);
  await p.choosePlan(plan);

  const i = new InvoicePage(global.__axwynDriver);
  await i.assertInvoiceDetails();
  await i.proceed();

  const pay = new PaymentPage(global.__axwynDriver);
  await pay.fillBilling(config.testData);
  await pay.fillCard();
  await pay.pay();

  await new PaymentSuccessPage(global.__axwynDriver)
    .assertSuccess(config.pricing[billing][plan]);

  return { user: u, plan, billing };
}

async function assertRedirectsToLogin() {
  const body = await global.__axwynDriver.findElement(By.css('body')).getText();
  if (!/sign in|login/i.test(body)) {
    throw new Error('Protected route remained accessible after logout; expected a sign-in/login state.');
  }
}

module.exports = {
  registerNewUser,
  loginUser,
  loginExistingUser,
  choosePlan,
  createSubscribedUser,
  assertRedirectsToLogin,
};
