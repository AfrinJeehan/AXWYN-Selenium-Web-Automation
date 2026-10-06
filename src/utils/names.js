const config=require('../../config');
function uniqueEmail(){
  const base=config.email.base;
  if(!base || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(base) || /yourcompany\.com$/i.test(base)) throw new Error('A real TEST_EMAIL_BASE is required for mutating/registration tests. Update .env with the approved company Outlook/Microsoft 365 QA mailbox.');
  const [local,domain]=base.split('@'); const stamp=Date.now().toString(36); return config.email.plusAddressing ? `${local}+axwynqa${stamp}@${domain}` : `${local}.axwynqa${stamp}@${domain}`;
}
module.exports={uniqueEmail};
