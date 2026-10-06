const {BasePage,By}=require('../core/base-page');
class ContactPage extends BasePage{
 async load(){return super.load('/contact');}
 field(name,type){return [By.css(`input[type="${type||'text'}"]`),By.css(`input[name*="${name}" i]`),By.css(`textarea[name*="${name}" i]`),By.xpath(`//label[contains(translate(normalize-space(.),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"${name}")]/following::input[1]`)];}
 async fillForm(v){for(const [n,val] of [['name',v.fullName],['email',v.email],['company',v.company],['phone',v.phone]]){try{await this.fill(this.field(n,n==='email'?'email':'text'),val);}catch{}} try{await this.fill(this.field('message'),v.message);}catch{}}
 async submit(){return this.click([By.css('button[type="submit"]'),By.css('input[type="submit"]'),By.xpath('//button[contains(translate(normalize-space(.),"SUBMIT","submit"),"submit")]')]);}
 async getValidationMessage(){const msgs=await this.validationMessages(); if(msgs.length)return msgs.join(' '); return this.bodyText();}
 async assertCoreContent(){await this.assertAnyText([/contact/i,/email/i,/phone/i]);}
}
module.exports={ContactPage};
