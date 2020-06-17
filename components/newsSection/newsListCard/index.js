import styles from './newsListCardStyles.module.css';
import utilStyles from '../../../styles/utilStyles.module.css';
import Link from 'next/link';
import { translateCategory } from '../../../lib/helpers';


export default function NewsListCard({list, title, withImages}){
    return (
        <div className={`${styles.listCard}`}>
            <h3 className={`${styles.title} ${utilStyles.textThin} ${utilStyles.textUpper}`}>
                {title}
            </h3>
            <ul>
                {
                    list.map( (item, index) => {
                        const pathCategory = translateCategory(item.category);
                        const link = `/${pathCategory}/${item.id}`;
                        return (
                            <li className={styles.listItem}  key={index + item.id}>
                                <Link href={link} as={link}>
                                    <a>
                                        <div className={`${utilStyles.dFlex}`}>
                                            {withImages&&(
                                                <div className={`${styles.imgWrap}`} style={{backgroundImage: `url(${item.image})`}}>
                                                    
                                                </div>
                                            )}
                                            <span className={`${utilStyles.dBlock}`} style={{width: '100%', paddingLeft: "1em"}}>
                                                    {item.title}
                                            </span>
                                        </div>
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