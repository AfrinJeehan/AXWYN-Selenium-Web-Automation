const {BasePage}=require('../core/base-page'); const {assertMoneyInText}=require('../utils/assertions');
class PaymentSuccessPage extends BasePage{async assertSuccess(amount){await this.assertAnyText([/payment successful/i,/success/i,/thank you/i,/subscription/i]); if(amount!=null) assertMoneyInText(await this.bodyText(),amount);}}
module.exports={PaymentSuccessPage};
