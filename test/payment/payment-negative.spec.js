const assert=require('node:assert/strict'); const config=require('../../config'); const {PaymentPage}=require('../../src/pages/payment.page');
describe('AXWYN Payment Negative Coverage',function(){
 it('has a Stripe declined test card configured',()=>assert.match(config.payment.declined,/^4[0-9]{15}$/));
 it('has an insufficient-funds test card configured',()=>assert.match(config.payment.insufficientFunds,/^4[0-9]{15}$/));
 it('has an expired-card test card configured',()=>assert.match(config.payment.expired,/^4[0-9]{15}$/));
 it('has an incorrect-CVC test card configured',()=>assert.match(config.payment.incorrectCvc,/^4[0-9]{15}$/));
 it('keeps payment page helpers callable',async()=>{const p=new PaymentPage(driver());assert.equal(typeof p.fillCard,'function');});
});function driver(){return global.__axwynDriver;}
