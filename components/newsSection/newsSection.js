import utilStyles from '../../styles/utilStyles.module.css'
import styles from './style.module.css'

export default function NewsSection({ children, equalCols }){
    let classes;
    let bigCol;
    if(children.length <= 2){
        bigCol = true;
        classes = ``;
    }else if(children.length === 3 && equalCols || children.length > 3){
        classes = `${styles.w100}`;
    }else{
        classes = ``;
    }

    return (
        <section className={`${utilStyles.container} ${styles.newsSection}`}>
            {children&&children.map( (child, index) => {
                return (
                    <div key={index} className={`${styles.col} ${classes} ${(bigCol&&(index==0)) ? styles.w70 : styles.w30}`}>
                        {child}
                    </div>
                )
            })}
        </section>
    )
}

