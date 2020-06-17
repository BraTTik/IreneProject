import {useEffect, useState } from 'react';
import Layout from '../../components/layout';
import Head from 'next/head';
import utilStyles from '../../styles/utilStyles.module.css';
import Main from '../../components/NewsPage/newsPageMainSection/newsPageMainSection';
import Aside from '../../components/NewsPage/newsPageAside/newsPageAside';
import NewsListCard from '../../components/newsSection/newsListCard';
import LittleImageCard from '../../components/newsSection/littleImageCard';
import styles from './idStyles.module.css';
import { getNewsInDirectory } from '../../lib/news';


export default function Post({popular, events}){
    const [news, setNews] = useState({});
    
    useEffect(() => {
        let path = window.location.pathname;
        const newsId = path.substr(path.lastIndexOf('/')+1);
        fetch(`/api/news/${newsId}`)
            .then(response => response.json())
            .then(result => {
                setNews({...result.news})
            });
    
    }, []);
    
    const {title} = news;
    return (
        <>
            <Head>
                <title>{ title || "Irene's site"}</title>
            </Head>
            <Layout>
                <section className={`${styles.newsContainer} ${utilStyles.container} ${utilStyles.dFlex}`}>
                    <Main {...news} />
                    <Aside>
                        <NewsListCard list={popular} title={'Популярное'}/>
                        <NewsListCard list={events} title={'События'} withImages/>
                        <h2>Рекомендумые новости:</h2>
                    </Aside>
                </section>
            </Layout>
        </>
    )
}


export async function getServerSideProps(){
    const popular = await getNewsInDirectory('popular');
    const events = await getNewsInDirectory('events');

    return {
        props: {
            popular,
            events
        }
    }
}