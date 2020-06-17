import styles from './newsPageMainSectionStyles.module.css';
import utilStyles from '../../../styles/utilStyles.module.css';
import Date from '../../../components/date';


export default function Main({id, title, category, author, date, image, htmlContent}){
    return (
        <main className={`${styles.main}`}>

            <div className={`${styles.header} ${utilStyles.dFlex}`}>
                <div className={`${styles.headers}`}>
                    <h3 className={`${utilStyles.textNormal} ${utilStyles.textUpper}`}>
                        { category }
                    </h3>
                    <h2 className={`${utilStyles.textLg} ${styles.title}`}>
                        {title}
                    </h2>
                    <small className={`${styles.author}`}>
                        Автор: {author}
                    </small>
                </div>
                <div className={`${styles.date}`}>
                    <Date date = {date}/>
                </div>
            </div>

            <div className={`${styles.image}`}>
                <img src={image}/>
            </div>
            <div className={`${styles.newsBody}`} dangerouslySetInnerHTML={ {__html: htmlContent} }/>

        </main>
    )
}