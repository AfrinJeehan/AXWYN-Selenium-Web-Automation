const {BasePage,By}=require('../core/base-page');
class ManageProfilePage extends BasePage{
 async assertPage(){await this.assertAnyText([/manage profile/i,/profile/i,/personal/i]);}
 async assertContactFieldsReadOnly(){const els=await this.driver.findElements(By.css('input[type="email"],input[name*="email" i],input[name*="mobile" i],input[name*="phone" i]')); if(!els.length) return; for(const e of els){const disabled=await e.getAttribute('disabled');const ro=await e.getAttribute('readonly'); if(!disabled&&!ro) throw new Error('Expected email/mobile contact fields to be read-only.');}}
 async uploadPhoto(){const inputs=await this.driver.findElements(By.css('input[type="file"]')); if(inputs.length) await inputs[0].sendKeys(require('../../config').testData.photo);}
 async toggleNotifications(){const c=await this.driver.findElements(By.css('input[type="checkbox"]')); if(c.length) await c[c.length-1].click();}
 async updateProfile(v){for(const [n,val] of [['first',v.firstName],['last',v.lastName],['street',v.street],['suburb',v.suburb],['postcode',v.postcode]]){try{await this.fill([By.css(`input[name*="${n}" i]`),By.css(`input[id*="${n}" i]`)],val);}catch{}}}
 async save(){await this.click([By.css('button[type="submit"]'),By.xpath('//button[contains(normalize-space(.),"Save")]')]);}
}
module.exports={ManageProfilePage};
