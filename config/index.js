const path = require('path');
try {
  require('dotenv').config({ path: path.join(process.cwd(), '.env') });
} catch (_) {}

const bool = (v, d = false) => v == null ? d : /^(1|true|yes|on)$/i.test(String(v).trim());
const num = (v, d) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};
const required = (name) => String(process.env[name] ?? '').trim();

const pricing = {
  annual: {
    Silver: num(process.env.ANNUAL_SILVER, 400),
    Gold: num(process.env.ANNUAL_GOLD, 700),
    Platinum: num(process.env.ANNUAL_PLATINUM, 900),
  },
  monthly: {
    Silver: num(process.env.MONTHLY_SILVER, 59.99),
    Gold: num(process.env.MONTHLY_GOLD, 99.99),
    Platinum: num(process.env.MONTHLY_PLATINUM, 119.99),
  },
};

module.exports = {
  rootDir: process.cwd(),
  baseUrl: required('BASE_URL') || 'https://www.uat.axwyn.com.au',
  browser: required('SELENIUM_BROWSER') || 'chrome',
  headless: bool(process.env.HEADLESS),
  window: {
    width: num(process.env.WINDOW_WIDTH, 1440),
    height: num(process.env.WINDOW_HEIGHT, 1000),
  },
  timeouts: {
    pageLoad: num(process.env.PAGE_LOAD_TIMEOUT_MS, 60000),
    implicit: num(process.env.IMPLICIT_WAIT_MS, 0),
    explicit: num(process.env.EXPLICIT_WAIT_MS, 20000),
    action: num(process.env.ACTION_TIMEOUT_MS, 15000),
  },
  artifacts: {
    screenshotOnFailure: bool(process.env.SCREENSHOT_ON_FAILURE, true),
    saveSourceOnFailure: bool(process.env.SAVE_PAGE_SOURCE_ON_FAILURE, true),
  },
  runMutatingTests: bool(process.env.RUN_MUTATING_TESTS),
  login: {
    email: required('TEST_LOGIN_EMAIL'),
    password: required('TEST_LOGIN_PASSWORD'),
  },
  testData: {
    password: required('TEST_PASSWORD'),
    firstName: required('TEST_FIRST_NAME') || 'Liam',
    lastName: required('TEST_LAST_NAME') || 'Anderson',
    phone: required('TEST_PHONE'),
    street: required('TEST_STREET'),
    suburb: required('TEST_SUBURB'),
    state: required('TEST_STATE'),
    postcode: required('TEST_POSTCODE'),
    company: required('TEST_COMPANY'),
    message: required('TEST_MESSAGE'),
    photo: path.resolve(required('TEST_PHOTO') || 'assets/qa-avatar.png'),
  },
  email: {
    base: required('TEST_EMAIL_BASE'),
    plusAddressing: bool(process.env.TEST_EMAIL_PLUS_ADDRESSING, true),
    mode: (required('EMAIL_VERIFICATION_MODE') || 'manual').toLowerCase(),
    mailbox: required('MS_GRAPH_MAILBOX'),
    tenant: required('MS_TENANT_ID'),
    clientId: required('MS_CLIENT_ID'),
    clientSecret: required('MS_CLIENT_SECRET'),
    sender: required('EMAIL_SENDER_CONTAINS') || 'AXWYN',
    subjects: (required('EMAIL_SUBJECT_CONTAINS') || 'Verify,Verification,Confirm,Activate')
      .split(',').map(s => s.trim()).filter(Boolean),
    pollInterval: num(process.env.EMAIL_POLL_INTERVAL_SECONDS, 5) * 1000,
    pollTimeout: num(process.env.EMAIL_POLL_TIMEOUT_SECONDS, 120) * 1000,
    lookback: num(process.env.EMAIL_LOOKBACK_MINUTES, 10),
  },
  payment: {
    success: required('TEST_CARD_SUCCESS'),
    declined: required('TEST_CARD_DECLINED'),
    insufficientFunds: required('TEST_CARD_INSUFFICIENT_FUNDS'),
    expired: required('TEST_CARD_EXPIRED'),
    incorrectCvc: required('TEST_CARD_INCORRECT_CVC'),
    cvc: required('TEST_CARD_CVC'),
    expiry: required('TEST_CARD_EXPIRY'),
    holder: required('TEST_CARDHOLDER_NAME'),
  },
  pricing,
};
