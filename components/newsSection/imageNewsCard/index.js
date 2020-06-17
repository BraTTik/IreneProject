import styles from './imageNewsStyles.module.css';
import utilStyles from '../../../styles/utilStyles.module.css'
import Link from 'next/link';
import { translateCategory } from '../../../lib/helpers'

export default function ImageNewsCard({id, title, author, date, image, category}){
    const pathCategory = translateCategory(category);
    return (
        <div className={`${styles.imageCard}`}>
            <Link href={`/${pathCategory}/${id}`} as={`/${pathCategory}/${id}`}>
                <a>
                    <div style={ {backgroundImage: `url(${image})`} } className={`${styles.imgWrap}`}>
                        <h2 className={`${styles.title} ${utilStyles.textLg} ${utilStyles.textBold}`}>{title}</h2>
                        <span className={`${styles.category} ${utilStyles.textThin} ${utilStyles.textUpper} ${utilStyles.textSm}`}>{category}</span>
                    </div>
                </a>
            </Link>

        </div>
    )
}