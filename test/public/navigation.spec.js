const {HomePage}=require('../../src/pages/home.page');
describe('AXWYN Public - Navigation',function(){
 it('opens Features',async()=>{const p=new HomePage(driver());await p.load();await p.clickNav('Features');await p.assertAnyText([/features/i]);});
 it('opens Pricing',async()=>{const p=new HomePage(driver());await p.load();await p.clickNav('Pricing');await p.assertAnyText([/silver/i,/gold/i,/platinum/i,/pricing/i]);});
 it('opens Sign In',async()=>{const p=new HomePage(driver());await p.load();await p.clickNav('Sign In');await p.assertAnyText([/sign in/i,/email/i]);});
 it('opens Registration from Get Started',async()=>{const p=new HomePage(driver());await p.load();await p.clickNav('Get Started');await p.assertAnyText([/register/i,/sign up/i,/first name/i]);});
});function driver(){return global.__axwynDriver;}
