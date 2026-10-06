const {BasePage,By}=require('../core/base-page');
class HomePage extends BasePage{
 async load(){return super.load('/');}
 async clickNav(name){return this.click([By.xpath(`//header//*[self::a or self::button][contains(normalize-space(.),${JSON.stringify(name)})]`),By.xpath(`//nav//*[self::a or self::button][contains(normalize-space(.),${JSON.stringify(name)})]`),By.xpath(`//*[self::a or self::button][normalize-space()=${JSON.stringify(name)}]`)]);}
 async clickText(name){return this.click([By.xpath(`//*[self::a or self::button][normalize-space()=${JSON.stringify(name)}]`),By.xpath(`//*[self::a or self::button][contains(normalize-space(.),${JSON.stringify(name)})]`)]);}
 async clickFooterText(name){await this.scrollToFooter();return this.clickText(name);}
}
module.exports={HomePage};
