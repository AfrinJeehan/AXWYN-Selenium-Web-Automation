const assert=require('node:assert/strict'); const {HomePage}=require('../../src/pages/home.page');
describe('AXWYN Performance Indicators',function(){
 it('records homepage load timing',async()=>{const p=new HomePage(driver());const t=await p.load();assert.ok(Number.isFinite(t)&&t>=0);global.__axwynPerformance=global.__axwynPerformance||[];global.__axwynPerformance.push({name:'homepage',durationMs:t});});
 it('records pricing navigation timing',async()=>{const p=new HomePage(driver());await p.load();const s=Date.now();await p.clickText('Pricing');const t=Date.now()-s;assert.ok(Number.isFinite(t)&&t>=0);global.__axwynPerformance=global.__axwynPerformance||[];global.__axwynPerformance.push({name:'pricing-navigation',durationMs:t});});
});function driver(){return global.__axwynDriver;}
