const {BasePage,By}=require('../core/base-page');
class InvoicePage extends BasePage{async assertInvoiceDetails(){await this.assertAnyText([/invoice/i,/billing/i,/total/i,/amount/i]);}async proceed(){return this.click([By.xpath('//button[contains(normalize-space(.),"Proceed") or contains(normalize-space(.),"Continue") or contains(normalize-space(.),"Pay")]'),By.css('button[type="submit"]')]);}}
module.exports={InvoicePage};
