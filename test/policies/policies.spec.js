const {HomePage}=require('../../src/pages/home.page'); const {PublicContentPage}=require('../../src/pages/public-content.page');
describe('AXWYN Legal Pages',function(){
 it('opens Terms & Conditions from the public site',async()=>{const h=new HomePage(driver());await h.load();await h.clickFooterText('Terms');await new PublicContentPage(driver()).assertPageText([/terms/i,/contact/i]);});
 it('opens Privacy Policy from the public site',async()=>{const h=new HomePage(driver());await h.load();await h.clickFooterText('Privacy');await new PublicContentPage(driver()).assertPageText([/privacy/i,/contact/i]);});
});function driver(){return global.__axwynDriver;}
