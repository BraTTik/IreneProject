import Head from 'next/head'
import Layout from '../components/layout'
import NewsSection from '../components/newsSection/newsSection'
import ImageNewsCard from '../components/newsSection/imageNewsCard';
import NewsListCard from '../components/newsSection/newsListCard';
import { getAllNews, getMainNews } from '../lib/news'

export default function Home({ mainNews, news }) {
  const main = JSON.parse(mainNews);
  const allNews = JSON.parse(news);
  console.log(allNews);
  return (
    <Layout>
        <NewsSection>
          <ImageNewsCard { ...main.mainNews[0]}/>
          <NewsListCard list = { allNews.news.popular} title="Популярное"/>
        </NewsSection>
        <NewsSection>
          <p>Child 1</p>
          <p>Child 2</p>
          <p>Child 3</p>
          <p>Child 4</p>
        </NewsSection>
        <NewsSection>
          <p>Child 1</p>
          <p>Child 2</p>
          <p>Child 3</p>
        </NewsSection>
        <NewsSection>
          <p>Child 1</p>
          <p>Child 2</p>
          <p>Child 3</p>
        </NewsSection>
    </Layout>
  )
}

export function getServerSideProps(){
  const news = getAllNews();
  const mainNews = getMainNews();
  console.log();

  return {
    props: {
      mainNews,
      news
    }
  }
}
