import styles from './newsListCardStyles.module.css';
import utilStyles from '../../../styles/utilStyles.module.css';
import Link from 'next/link'


export default function NewsListCard({list, title, withImages}){
    
    return (
        <div className={`${styles.listCard}`}>
            <h3 className={`${styles.title} ${utilStyles.textThin} ${utilStyles.textUpper}`}>
                {title}
            </h3>
            <ul>
                {
                    list.map( (item, index) => {
                        return (
                            <li className={styles.listItem}  key={index + item.id}>
                                <Link href={`/${item.id}`} as={`/${item.id}`}>
                                    <div className={`${utilStyles.dFlex}`}>
                                        {withImages&&(
                                            <div className={`${styles.imgWrap}`} style={{backgroundImage: `url(${item.image})`}}>
                                                
                                            </div>
                                        )}
                                        <a className={`${utilStyles.dBlock}`} style={{width: '100%', paddingLeft: "1em"}}>
                                                {item.title}
                                        </a>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}