const readline=require('node:readline'); const config=require('../../../config');
function ask(q){return new Promise(resolve=>{const rl=readline.createInterface({input:process.stdin,output:process.stdout}); rl.question(q,a=>{rl.close();resolve(a.trim());});});}
async function verifyManually(){
  console.log(`\n[AXWYN EMAIL] Open ${config.email.mailbox || config.email.base} and complete the AXWYN verification email.`);
  const answer=await ask('After verification is completed, press Enter here to continue. '); return answer;
}
async function verify(){
  if(config.email.mode==='manual') return verifyManually();
  throw new Error('EMAIL_VERIFICATION_MODE=graph requires Microsoft Graph credentials. Set MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET and MS_GRAPH_MAILBOX, then enable Graph mode.');
}
module.exports={verify};
