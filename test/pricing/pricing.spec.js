const assert = require('node:assert/strict');
const config = require('../../config');
const { PricingPage } = require('../../src/pages/pricing.page');

describe('AXWYN Pricing', function () {
  it('shows annual plans and documented annual prices', async () => {
    const p = new PricingPage(driver());
    await p.load();
    await p.selectBillingPeriod('annual');
    assert.equal(
      await p.visiblePlanPrices(Object.values(config.pricing.annual)),
      true,
      `Documented annual prices were not all visible. Expected: ${Object.values(config.pricing.annual).join(', ')}`
    );
    await p.assertAnyText([/silver/i, /gold/i, /platinum/i]);
  });

  it('shows monthly plans and documented monthly prices', async () => {
    const p = new PricingPage(driver());
    await p.load();
    await p.selectBillingPeriod('monthly');
    assert.equal(
      await p.visiblePlanPrices(Object.values(config.pricing.monthly)),
      true,
      `Documented monthly prices were not all visible. Expected: ${Object.values(config.pricing.monthly).join(', ')}`
    );
    await p.assertAnyText([/silver/i, /gold/i, /platinum/i]);
  });
});

function driver() {
  return global.__axwynDriver;
}
