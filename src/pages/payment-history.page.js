const {BasePage}=require('../core/base-page');
class PaymentHistoryPage extends BasePage{async assertRecord(){await this.assertAnyText([/payment history/i,/invoice/i,/amount/i]);}async assertMaskedCard(){await this.assertAnyText([/[*•xX]{2,}/,/ending/i,/last 4/i,/[0-9]{4}/]);}}
module.exports={PaymentHistoryPage};
