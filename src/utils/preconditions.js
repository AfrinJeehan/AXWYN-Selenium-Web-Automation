const config = require('../../config');

function hasValidEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(value || ''));
}

function canLoginWithConfiguredUser() {
  return hasValidEmail(config.login.email) && Boolean(config.login.password);
}

function canRunMutating() {
  return Boolean(config.runMutatingTests)
    && hasValidEmail(config.email.base)
    && !/yourcompany\.com$/i.test(config.email.base);
}

function requireConfiguredLogin() {
  if (!canLoginWithConfiguredUser()) {
    throw new Error(
      'Authenticated web test blocked: set TEST_LOGIN_EMAIL and TEST_LOGIN_PASSWORD in .env using the approved AXWYN QA/UAT account.'
    );
  }
}

function requireMutating() {
  if (!canRunMutating()) {
    throw new Error(
      'Mutating test blocked: set RUN_MUTATING_TESTS=true and replace TEST_EMAIL_BASE with the approved real Outlook/Microsoft 365 QA mailbox in .env.'
    );
  }
}

module.exports = {
  hasValidEmail,
  canLoginWithConfiguredUser,
  canRunMutating,
  requireConfiguredLogin,
  requireMutating,
};
