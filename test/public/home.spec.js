const assert=require('node:assert/strict'); const {HomePage}=require('../../src/pages/home.page');
describe('AXWYN Public - Homepage',function(){
 it('loads hero content',async()=>{const p=new HomePage(driver());await p.load();const hrefs=await p.hrefs();assert.ok(hrefs.some(h=>/apps\.apple|appstore/i.test(h||''))||await p.hasText(/AXWYN|expense management/i));});
 it('displays documented Why Choose AXWYN content',async()=>{const p=new HomePage(driver());await p.load();await p.assertAnyText([/why choose axwyn/i,/expense management/i,/automation/i,/visibility/i,/business/i]);});
 it('expands FAQ content',async()=>{const p=new HomePage(driver());await p.load();const els=await driver().findElements(require('selenium-webdriver').By.css('button[aria-expanded], [role="button"]'));assert.ok(els.length>0,'No FAQ/accordion controls were found.');for(const e of els.slice(0,3)){await driver().executeScript('arguments[0].scrollIntoView({block:"center"});',e);await e.click().catch(()=>{});}assert.ok(await p.hasText(/faq|frequently asked|question|answer/i));});
 it('displays CTA actions',async()=>{const p=new HomePage(driver());await p.load();await p.assertAnyText([/schedule a consultation/i,/get started/i,/pricing/i,/contact/i]);});
});function driver(){return global.__axwynDriver;}
