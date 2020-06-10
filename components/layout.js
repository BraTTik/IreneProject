import Head from 'next/head'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'

export default function Layout({children}){
    return(
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Irene's Site</title>
            </Head>
            <Header/>
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}