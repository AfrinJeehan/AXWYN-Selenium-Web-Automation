const assert=require('node:assert/strict'); const {ContactPage}=require('../../src/pages/contact.page'); const config=require('../../config');
describe('AXWYN Contact Us',function(){
 it('shows contact information',async()=>{const p=new ContactPage(driver());await p.load();await p.assertCoreContent();});
 it('blocks empty submission',async()=>{const p=new ContactPage(driver());await p.load();await p.submit();assert.ok(await p.getValidationMessage());});
 it('validates an invalid email',async()=>{const p=new ContactPage(driver());await p.load();await p.fillForm({fullName:'QA User',email:'invalid-email',company:config.testData.company,phone:config.testData.phone,message:config.testData.message});await p.submit();assert.ok(await p.getValidationMessage());});
}); function driver(){return global.__axwynDriver;}
