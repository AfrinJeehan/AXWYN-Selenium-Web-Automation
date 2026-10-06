const { createSubscribedUser } = require('../support/fixtures');
const { ProfilePage } = require('../../src/pages/profile.page');

const cases = [
  ['monthly', 'Silver'],
  ['monthly', 'Gold'],
  ['monthly', 'Platinum'],
  ['annual', 'Silver'],
  ['annual', 'Gold'],
  ['annual', 'Platinum'],
];

describe('AXWYN Subscription', function () {
  for (const [billing, plan] of cases) {
    it(`completes payment and activates ${billing} ${plan}`, async function () {
      this.timeout(300000);
      await createSubscribedUser(plan, billing);
      const profile = new ProfilePage(driver());
      await profile.load();
      await profile.assertActivePlan(plan);
    });
  }
});

function driver() {
  return global.__axwynDriver;
}
