const {BasePage}=require('../core/base-page');
class PublicContentPage extends BasePage{async assertPageText(patterns){await this.assertAnyText(patterns);}}
module.exports={PublicContentPage};
