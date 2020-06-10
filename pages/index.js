import Head from 'next/head';
import Layout from '../components/layout';
import NewsSection from '../components/newsSection/newsSection'
import ImageNewsCard from '../components/newsSection/imageNewsCard';
import NewsListCard from '../components/newsSection/newsListCard';
import LittleImageCard from '../components/newsSection/littleImageCard';
import ImageTextCard from '../components/newsSection/imageTextCard';
import DigitCard from '../components/newsSection/digitCard/digitCard';
import { getNewsData, getSpaceDigits } from '../lib/news';

export default function Home({ news, spaceDigits }) {
  function* getNewsGenerator(arr){
    for(let i = 0; i < news.length; i++){
      yield arr[i];
    }
  }
  function getNews(news){
    let iterator = getNewsGenerator(news);
    return function () {
      let value = iterator.next();
      if(value.done){
        iterator = getNewsGenerator(news);
        value = iterator.next();
      }

      return value.value;
    }
  }

  const newsDeploy = getNews(news);
  const digitsDeploy = getNews(spaceDigits);

  function getNewsList(){
    let result = [];
    for(let i = 0; i < 4; i++){
        result = [...result, newsDeploy()];
    }

    return result;
  }
  return (
    <Layout>
        <NewsSection>
          <ImageNewsCard { ...newsDeploy()}/>
          <NewsListCard list = { [...getNewsList()]} title="Популярное"/>
        </NewsSection>
        <NewsSection>
          <LittleImageCard news = { newsDeploy() }/>
          <LittleImageCard news = { newsDeploy() }/>
          <LittleImageCard news = { newsDeploy() }/>
          <DigitCard {...digitsDeploy()}/>
        </NewsSection>
        <NewsSection>
          <ImageNewsCard { ...newsDeploy() }/>
          <ImageTextCard { ...newsDeploy() }/>
          <NewsListCard list = { [...getNewsList()] } title="События" withImages/>
        </NewsSection>
        <NewsSection>
          <ImageNewsCard { ...newsDeploy() }/>
          <ImageTextCard { ...newsDeploy() }/>
          <ImageTextCard { ...newsDeploy() }/>
        </NewsSection>
        <NewsSection>
          <ImageNewsCard { ...newsDeploy() }/>
          <ImageTextCard { ...newsDeploy() }/>
          <ImageTextCard { ...newsDeploy() }/>
        </NewsSection>
        <NewsSection>
          <ImageNewsCard { ...newsDeploy() }/>
          <ImageTextCard { ...newsDeploy() }/>
          <ImageTextCard { ...newsDeploy() }/>
        </NewsSection>
        <NewsSection>
          <LittleImageCard news = { newsDeploy() }/>
          <LittleImageCard news = { newsDeploy() }/>
          <LittleImageCard news = { newsDeploy() }/>
          <DigitCard {...digitsDeploy()}/>
        </NewsSection>
        <NewsSection equalCols>
          <ImageTextCard { ...newsDeploy() }/>
          <ImageNewsCard { ...newsDeploy() }/>
          <ImageNewsCard { ...newsDeploy() }/>
        </NewsSection>
        <NewsSection>
          <DigitCard {...digitsDeploy()}/>
          <LittleImageCard news = { newsDeploy() }/>
          <LittleImageCard news = { newsDeploy() }/>
          <LittleImageCard news = { newsDeploy() }/>
        </NewsSection>
    </Layout>
  )
}

export async function getServerSideProps(){
  const news = await getNewsData();
  const digits = await getSpaceDigits();
  return {
    props: { 
      news,
      ...digits
     }
  }
}
