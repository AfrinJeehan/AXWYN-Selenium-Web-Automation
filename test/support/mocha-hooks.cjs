const fs=require('node:fs'); const path=require('node:path'); const config=require('../../config'); const {createDriver}=require('../../src/core/driver');
function ensure(){for(const d of ['reports','reports/screenshots','reports/page-sources','reports/mochawesome','logs'])fs.mkdirSync(path.join(config.rootDir,d),{recursive:true});}
module.exports={mochaHooks:{
 async beforeEach(){ensure(); global.__axwynDriver=await createDriver(); await global.__axwynDriver.get(config.baseUrl);},
 async afterEach(){const d=global.__axwynDriver; try{if(d && this.currentTest?.state==='failed'){const safe=this.currentTest.fullTitle().replace(/[^a-z0-9._-]+/gi,'_').slice(0,150);const ts=new Date().toISOString().replace(/[:.]/g,'-');if(config.artifacts.screenshotOnFailure)fs.writeFileSync(path.join(config.rootDir,'reports/screenshots',`${ts}-${safe}.png`),await d.takeScreenshot(),'base64');if(config.artifacts.saveSourceOnFailure)fs.writeFileSync(path.join(config.rootDir,'reports/page-sources',`${ts}-${safe}.html`),await d.getPageSource(),'utf8');}}finally{if(d)await d.quit().catch(()=>{});global.__axwynDriver=null;}},
 afterAll(){ensure();fs.writeFileSync(path.join(config.rootDir,'reports/performance.json'),JSON.stringify(global.__axwynPerformance||[],null,2));}
}};
