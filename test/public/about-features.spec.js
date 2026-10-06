const assert=require('node:assert/strict'); const {HomePage}=require('../../src/pages/home.page');
describe('AXWYN Public - About and Features',function(){
 it('opens About page from navigation',async()=>{const p=new HomePage(driver());await p.load();await p.clickNav('About');await p.assertAnyText([/about/i,/axwyn/i]);});
 it('opens Features page from navigation',async()=>{const p=new HomePage(driver());await p.load();await p.clickNav('Features');await p.assertAnyText([/features/i,/automation/i,/expense/i]);});
 it('keeps pricing navigation available from public pages',async()=>{const p=new HomePage(driver());await p.load();await p.clickNav('Pricing');assert.ok(/silver|gold|platinum|pricing/i.test(await p.bodyText()));});
 it('keeps Contact navigation available from public pages',async()=>{const p=new HomePage(driver());await p.load();await p.clickNav('Contact');assert.ok(/contact|email|phone/i.test(await p.bodyText()));});
});function driver(){return global.__axwynDriver;}
