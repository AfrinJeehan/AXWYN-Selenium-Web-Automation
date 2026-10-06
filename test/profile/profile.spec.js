const { ProfilePage } = require('../../src/pages/profile.page');
const { ManageProfilePage } = require('../../src/pages/manage-profile.page');
const { loginExistingUser } = require('../support/fixtures');
const { requireConfiguredLogin, requireMutating } = require('../../src/utils/preconditions');

describe('AXWYN Profile', function () {
  it('opens Profile for the configured QA account', async function () {
    this.timeout(120000);
    requireConfiguredLogin();
    await loginExistingUser();
    const p = new ProfilePage(driver());
    await p.load();
    await p.assertAnyText([/profile/i, /subscription/i, /account/i]);
  });

  it('opens Manage Profile', async function () {
    this.timeout(120000);
    requireConfiguredLogin();
    await loginExistingUser();
    const p = new ProfilePage(driver());
    await p.load();
    await p.clickManageProfile();
    await new ManageProfilePage(driver()).assertPage();
  });

  it('keeps email and mobile read-only on Manage Profile', async function () {
    this.timeout(120000);
    requireConfiguredLogin();
    await loginExistingUser();
    const p = new ProfilePage(driver());
    await p.load();
    await p.clickManageProfile();
    const m = new ManageProfilePage(driver());
    await m.assertPage();
    await m.assertContactFieldsReadOnly();
  });

  it('uploads photo and saves profile changes', async function () {
    this.timeout(120000);
    requireConfiguredLogin();
    requireMutating();
    await loginExistingUser();
    const p = new ProfilePage(driver());
    await p.load();
    await p.clickManageProfile();
    const m = new ManageProfilePage(driver());
    await m.assertPage();
    await m.uploadPhoto();
    await m.toggleNotifications();
    await m.updateProfile({ firstName: 'Noah', lastName: 'Anderson', street: '250 George Street', suburb: 'Sydney', postcode: '2000' });
    await m.save();
    await m.assertPage();
  });
});

function driver() {
  return global.__axwynDriver;
}
