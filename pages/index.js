import Head from 'next/head';
import Layout from '../components/layout';
import NewsSection from '../components/newsSection/newsSection'
import ImageNewsCard from '../components/newsSection/imageNewsCard';
import NewsListCard from '../components/newsSection/newsListCard';
import LittleImageCard from '../components/newsSection/littleImageCard';
import ImageTextCard from '../components/newsSection/imageTextCard';
import DigitCard from '../components/newsSection/digitCard/digitCard';
import { getNewsData, getSpaceDigits, getNewsInDirectory } from '../lib/news';

export default function Home({ news, popular, events, spaceDigits }) {
  const newsDeploy = getNews(news);
  const digitsDeploy = getNews(spaceDigits);

  return (
    <>
      <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Irene's Site</title>
      </Head>
      <Layout>
        <NewsSection>
          <ImageNewsCard { ...newsDeploy()}/>
          <NewsListCard list = { popular } title="Популярное"/>
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
          <NewsListCard list = { events } title="События" withImages/>
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
    </>
  )
}

export function getNews(news){
  function* getNewsGenerator(arr){
    for(let i = 0; i < news.length; i++){
      yield arr[i];
    }
  }
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

export async function getServerSideProps(){
  const news = await getNewsData();
  const digits = await getSpaceDigits();
  const popular = await getNewsInDirectory('popular');
  const events = await getNewsInDirectory('events');
  console.log(popular);
  return {
    props: { 
      news,
      popular,
      events,
      ...digits
     }
  }
}
