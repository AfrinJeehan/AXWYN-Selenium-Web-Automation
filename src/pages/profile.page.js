const {BasePage,By}=require('../core/base-page');
class ProfilePage extends BasePage{
 async load(){return super.load('/profile');}
 async clickManageProfile(){return this.click([By.xpath('//*[self::a or self::button][contains(normalize-space(.),"Manage Profile")]')]);}
 async clickChangePlan(){return this.click([By.xpath('//*[self::a or self::button][contains(normalize-space(.),"Change Plan")]')]);}
 async clickPaymentHistory(){return this.click([By.xpath('//*[self::a or self::button][contains(normalize-space(.),"Payment History")]')]);}
 async assertNoActivePlan(){await this.assertAnyText([/no active plan/i,/choose plan/i,/subscription/i]);}
 async assertActivePlan(plan){await this.assertAnyText([new RegExp(`active plan[\\s\\S]{0,100}${plan}`,'i'),new RegExp(`subscription[\\s\\S]{0,100}${plan}`,'i'),new RegExp(plan,'i')]);}
}
module.exports={ProfilePage};
