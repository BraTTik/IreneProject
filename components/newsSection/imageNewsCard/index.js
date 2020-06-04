import styles from './imageNewsStyles.module.css';
import utilStyles from '../../../styles/utilStyles.module.css'
import Link from 'next/link';

export default function ImageNewsCard({id, title, author, date, image, category}){
    return (
        <div className={`${styles.imageCard}`}>
            <Link href={`/${id}`} as={`/${id}`}>
                <a>
                    <div style={ {backgroundImage: `url(${image})`, minHeight: '100%'} } className={`${styles.imgWrap}`}>
                        <h2 className={`${styles.title} ${utilStyles.textLg} ${utilStyles.textBold}`}>{title}</h2>
                        <span className={`${styles.category} ${utilStyles.textThin} ${utilStyles.textUpper} ${utilStyles.textSm}`}>{category}</span>
                    </div>
                </a>
            </Link>
        </div>
    )
}