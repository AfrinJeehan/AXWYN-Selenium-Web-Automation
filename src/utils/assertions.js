const assert=require('node:assert/strict');
function money(n){return Number(n).toFixed(2);}
function assertMoneyInText(text,value){const raw=money(value); const ok=text.includes(raw)||text.includes(String(value)); assert.ok(ok,`Expected amount ${value} in text but it was not found.`);}
module.exports={assertMoneyInText};
