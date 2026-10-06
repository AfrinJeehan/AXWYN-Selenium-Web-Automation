module.exports={
 require:['./test/support/mocha-hooks.cjs'],
 timeout:180000,
 color:true,
 reporter:process.env.MOCHA_REPORTER||'spec',
 exit:true,
 fullTrace:true
};
