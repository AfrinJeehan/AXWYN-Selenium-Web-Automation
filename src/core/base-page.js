const { By, until } = require('selenium-webdriver');
const config = require('../../config');

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async load(path = '') {
    const started = Date.now();
    const url = new URL(path, config.baseUrl).href;
    await this.driver.get(url);
    await this.driver.wait(async () => {
      try {
        return await this.driver.executeScript('return document.readyState') === 'complete';
      } catch (_) {
        return false;
      }
    }, config.timeouts.pageLoad).catch(() => {});
    return Date.now() - started;
  }

  async first(locators, timeout = config.timeouts.explicit) {
    const list = Array.isArray(locators) ? locators : [locators];
    const end = Date.now() + timeout;
    let last;
    while (Date.now() < end) {
      for (const loc of list) {
        try {
          const els = await this.driver.findElements(loc);
          for (const e of els) {
            if (await e.isDisplayed().catch(() => false)) return e;
          }
        } catch (err) {
          last = err;
        }
      }
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    throw new Error(
      `Element not found after ${timeout}ms. Locators tried: ${list.map(String).join(' | ')}`
      + (last ? ` (${last.message})` : '')
    );
  }

  async click(locators, timeout = config.timeouts.action) {
    const e = await this.first(locators, timeout);
    await this.driver.executeScript('arguments[0].scrollIntoView({block:"center",inline:"center"});', e).catch(() => {});
    try {
      await e.click();
    } catch (_) {
      await this.driver.executeScript('arguments[0].click();', e);
    }
    return e;
  }

  async fill(locators, value, timeout = config.timeouts.action) {
    const e = await this.first(locators, timeout);
    await e.clear().catch(() => {});
    await e.sendKeys(String(value ?? ''));
    return e;
  }

  async text(locators, timeout = config.timeouts.explicit) {
    const e = await this.first(locators, timeout);
    return (await e.getText()).trim();
  }

  async bodyText() {
    return (await this.driver.findElement(By.css('body')).getText()).trim();
  }

  async hasText(re) {
    return re.test((await this.bodyText()).replace(/\s+/g, ' '));
  }

  async assertAnyText(patterns) {
    for (const p of patterns) {
      if (await this.hasText(p instanceof RegExp ? p : new RegExp(String(p), 'i'))) return true;
    }
    throw new Error(`None of the expected page texts were visible: ${patterns.join(', ')}`);
  }

  async assertVisibleAny(locators, timeout = config.timeouts.explicit) {
    await this.first(locators, timeout);
    return true;
  }

  async hrefs() {
    const a = await this.driver.findElements(By.css('a[href]'));
    return Promise.all(a.map(x => x.getAttribute('href')));
  }

  async scrollToFooter() {
    await this.driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
  }

  async validationMessages() {
    return this.driver.executeScript(
      `return Array.from(document.querySelectorAll('input,textarea,select')).map(e => e.validationMessage).filter(Boolean);`
    );
  }
}

module.exports = { BasePage, By, until };
