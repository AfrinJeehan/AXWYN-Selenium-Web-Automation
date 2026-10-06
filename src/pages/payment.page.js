const {BasePage,By}=require('../core/base-page');
const config=require('../../config');
class PaymentPage extends BasePage{
 async assertAmount(v){await this.assertAnyText([new RegExp(`\\$?${Number(v).toFixed(2)}`),new RegExp(String(v))]);}
 async fillBilling(d){for(const [n,val] of [['street',d.street],['suburb',d.suburb],['state',d.state],['postcode',d.postcode]]){try{await this.fill([By.css(`input[name*="${n}" i]`),By.css(`input[id*="${n}" i]`)],val);}catch{}}}
 async fillCard(card=config.payment.success){
  const nums=await this.driver.findElements(By.css('input[autocomplete*="cc-number" i],input[name*="cardNumber" i],input[name*="card-number" i],input[inputmode="numeric"]')); if(nums.length) await nums[0].sendKeys(card);
  const cvcs=await this.driver.findElements(By.css('input[autocomplete*="cc-csc" i],input[name*="cvc" i],input[name*="cvv" i]')); if(cvcs.length) await cvcs[0].sendKeys(config.payment.cvc);
  const exp=await this.driver.findElements(By.css('input[autocomplete*="cc-exp" i],input[name*="expiry" i],input[name*="exp" i]')); if(exp.length) await exp[0].sendKeys(config.payment.expiry);
  const holder=await this.driver.findElements(By.css('input[name*="cardholder" i],input[name*="card-holder" i]')); if(holder.length) await holder[0].sendKeys(config.payment.holder);
 }
 async pay(){return this.click([By.css('button[type="submit"]'),By.xpath('//button[contains(translate(normalize-space(.),"PAYPURCHASE","paypurchase"),"pay") or contains(translate(normalize-space(.),"PURCHASE","purchase"),"purchase")]')]);}
 async assertFailureMessage(){await this.assertAnyText([/declined/i,/failed/i,/unable/i,/error/i,/insufficient/i,/invalid/i]);}
}
module.exports={PaymentPage};
