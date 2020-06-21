import NewsSection from '../components/newsSection/newsSection'
import ImageNewsCard from '../components/newsSection/imageNewsCard';
import NewsListCard from '../components/newsSection/newsListCard';
import LittleImageCard from '../components/newsSection/littleImageCard';
import ImageTextCard from '../components/newsSection/imageTextCard';
import DigitCard from '../components/newsSection/digitCard/digitCard';

export default class NewsSectionBuilder{
    constructor(){
      this.sections = {
          FIRST_SECTION : 'first_section',
          LITTLE_IMAGE_SECTION: 'little_image_section',
          BIG_IMAGE_SECTION: 'big_image_section',
          EQUAL_COLS_SECTION: 'equal_cols_section',
      }
      this.__news = null;
      this.__typeSection = null;
      this.__getTypeSection = {
        [this.sections.FIRST_SECTION]: this.__getFirstSection,
        [this.sections.LITTLE_IMAGE_SECTION]: this.__getLittleImageSection,
        [this.sections.BIG_IMAGE_SECTION]: this.__getBigImageSection,
        [this.sections.EQUAL_COLS_SECTION]: this.__getEqualColsSection,
      }
    }
    addNews(...news){
      this.__news = news;
      return this;
    }
  
    getSectionType(type){
      this.__typeSection = this.__getTypeSection[type];
      return this;
    }
    build(){
      const section = this.__typeSection();
      this.__clear();
      return section;
    }


    __getFirstSection(){
      return (
        <NewsSection>
            <ImageNewsCard {...this.__news.shift()}/>
            <NewsListCard list={ this.__news } title='Популярное'/>
        </NewsSection>
      )
    }

    __getBigImageSection(){
        let events = false;
        if(this.__news.length > 3){
            events = true;
        }
        return (
            <NewsSection>
                <ImageNewsCard {...this.__news.shift()}/>
                <ImageTextCard {...this.__news.shift()}/>
                {events ? (
                    <NewsListCard list={this.__news} title='События' withImages/>
                ):(
                    <ImageTextCard {...this.__news.shift()}/>
                )}
            </NewsSection>
        )
    }

    __getEqualColsSection(){
         return (
            <NewsSection equalCols>
                <ImageTextCard { ...this.__news.shift() }/>
                <ImageNewsCard { ...this.__news.shift() }/>
                <ImageNewsCard { ...this.__news.shift() }/>
            </NewsSection>
  
         )
    }

    __getLittleImageSection(){
        if(this.__news.length != 4){
            throw new Error('In little_image_section must be 4 items');
        }
        const digit = this.__news.find( ({category}, index) => {
            this.__news.splice(index, 1);
            return category.toLowerCase() === 'космос в цифрах';
        })
        return(
            <NewsSection>
                <LittleImageCard news = { this.__news.shift() }/>
                <LittleImageCard news = { this.__news.shift() }/>
                <LittleImageCard news = { this.__news.shift() }/>
                {digit ? (
                    <DigitCard {...digit}/>
                    ):(
                    <LittleImageCard news = {this.__news.shift()}/>
                )}
            </NewsSection>
        )
    }
    __clear(){
      this.__news = null;
      this.__typeSection = null;
    }
  
  }