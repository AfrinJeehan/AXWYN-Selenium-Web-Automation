const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const config = require('../../config');

async function createDriver(){
  const b=(config.browser||'chrome').toLowerCase();
  let builder = new Builder().forBrowser(b);
  if(b==='chrome'){
    const o=new chrome.Options();
    if(config.headless) o.addArguments('--headless=new');
    o.addArguments(`--window-size=${config.window.width},${config.window.height}`,'--disable-notifications','--disable-popup-blocking');
    if(process.env.IGNORE_CERT_ERRORS==='true') o.addArguments('--ignore-certificate-errors');
    builder.setChromeOptions(o);
  } else if(b==='firefox'){
    const o=new firefox.Options(); if(config.headless) o.addArguments('-headless'); builder.setFirefoxOptions(o);
  }
  const d=await builder.build();
  await d.manage().setTimeouts({pageLoad:config.timeouts.pageLoad, implicit:config.timeouts.implicit, script:config.timeouts.action});
  await d.manage().window().setRect({width:config.window.width,height:config.window.height});
  return d;
}
module.exports={createDriver};
