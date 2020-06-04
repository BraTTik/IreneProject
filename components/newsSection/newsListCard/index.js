import styles from './newsListCardStyles.module.css';
import utilStyles from '../../../styles/utilStyles.module.css';
import Link from 'next/link'


export default function NewsListCard({list, title}){
    console.log(list);
    return (
        <div className={`${styles.listCard}`}>
            <h3 className={`${styles.title} ${utilStyles.textThin} ${utilStyles.textUpper}`}>
                {title}
            </h3>
            <ul>
                {
                    list.map( (item, index) => {

                        return (
                            <li className={styles.listItem}>
                                <Link href={`/${item.id}`} as={`/${item.id}`}>
                                    <a key={index} className={`${utilStyles.dBlock}`}>
                                            {item.title}
                                    </a>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}