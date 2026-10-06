const { BasePage, By } = require('../core/base-page');

class PricingPage extends BasePage {
  async load() {
    return super.load('/pricing');
  }

  async selectBillingPeriod(period) {
    const label = period === 'annual' ? 'annual' : 'monthly';
    const other = label === 'annual' ? 'yearly' : 'monthly';
    await this.click([
      By.xpath(`//*[self::button or self::label or @role="button"][contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"${label}")]`),
      By.xpath(`//*[self::button or self::label or @role="button"][contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"${other}")]`),
      By.xpath(`//input[@type="radio" and (contains(@value,"${label}") or contains(@id,"${label}"))]/following-sibling::*[1]`),
    ], 8000).catch(() => {});
  }

  async choosePlan(plan) {
    const p = String(plan).toLowerCase();
    return this.click([
      By.xpath(`//*[self::a or self::button][contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"${p}") and (contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"choose") or contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"select") or contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"subscribe"))]`),
      By.xpath(`//*[self::a or self::button][contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"${p}")]`),
      By.xpath(`//*[self::a or self::button][contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"choose plan") or contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"subscribe")]`),
    ]);
  }

  async visiblePlanPrices(prices) {
    const body = await this.bodyText();
    return prices.every(v => {
      const n = Number(v);
      return body.includes(String(v)) || body.includes(n.toFixed(2)) || body.includes(n.toFixed(0));
    });
  }
}

module.exports = { PricingPage };
