const config = require('../../config');
const { uniqueEmail } = require('./names');

function buildUser(overrides = {}) {
  return {
    password: config.testData.password,
    firstName: config.testData.firstName,
    lastName: config.testData.lastName,
    phone: config.testData.phone,
    street: config.testData.street,
    suburb: config.testData.suburb,
    state: config.testData.state,
    postcode: config.testData.postcode,
    company: config.testData.company,
    email: uniqueEmail(),
    ...overrides,
  };
}

function buildConfiguredLoginUser() {
  return {
    email: config.login.email,
    password: config.login.password,
  };
}

module.exports = { buildUser, buildConfiguredLoginUser };
