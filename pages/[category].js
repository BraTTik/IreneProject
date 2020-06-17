import Head from 'next/head';
import utilStyles from '../styles/utilStyles.module.css';
import Layout from '../components/layout';
import * as LINKS from '../assets/navigation_links';
import NewsSection from '../components/newsSection/newsSection';
import ImageNewsCard from '../components/newsSection/imageNewsCard';
import ImageTextCard from '../components/newsSection/imageTextCard';
import {useRouter} from 'next/router';
import { getCategoryNews } from '../lib/news';
import { getNews } from './index';

export default function Category({news}){
    let noNews = false;
    const router = useRouter();
    const {category} = router.query;

    const deployNews = getNews(news);

    if(news.length === 0){
        noNews = true;
    }
    return(
        <>
            <Head>
                <title>{category}</title>
            </Head>
            <Layout>
                {noNews ? (
                    <div className={utilStyles.container}>Новостей нет</div>
                ):(
                <>
                    <NewsSection>
                        <ImageNewsCard {...deployNews()}/>
                        <ImageTextCard {...deployNews()}/>
                        <ImageTextCard {...deployNews()}/>
                    </NewsSection>

                    <NewsSection>
                        <ImageNewsCard {...deployNews()}/>
                        <ImageTextCard {...deployNews()}/>
                        <ImageTextCard {...deployNews()}/>
                    </NewsSection>
                
                    <NewsSection>
                        <ImageNewsCard {...deployNews()}/>
                        <ImageTextCard {...deployNews()}/>
                        <ImageTextCard {...deployNews()}/>
                    </NewsSection>
                
                    <NewsSection>
                        <ImageNewsCard {...deployNews()}/>
                        <ImageTextCard {...deployNews()}/>
                        <ImageTextCard {...deployNews()}/>
                    </NewsSection>
                
                </>
                )}
            </Layout>
        </>
    )
}


export async function getStaticProps({params}){
    console.log(params.category);
    const news = await getCategoryNews(params.category);
    return {
        props: {
            news
        }
    }
}

export function getStaticPaths(){
    const categories = [
        LINKS.HYPOTHESIS,
        LINKS.INTERVIEW,
        LINKS.NEWS,
        LINKS.TELESCOPE,
        LINKS.TECH
    ];
    const result = categories.map( category => {
        return {
                params: {
                    category
                }
            }
    })
    return {
        paths: categories,
        fallback: true
    }
}


