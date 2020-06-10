import utilStyles from '../../styles/utilStyles.module.css'
import styles from './style.module.css'

export default function NewsSection({ children, equalCols }){
    let classes = `${utilStyles.customScroll}`;
    let bigCol;
    let twoCols = false;
    let threeCols = false;
    let multiCols = false;
    if(children.length <= 2){
        twoCols = true;
        bigCol = true;
    }
    if(children.length === 3){
        threeCols = true;
    }
    if(children.length > 3){
        multiCols = true;
    }

    return (
        <section className={`${utilStyles.container} ${styles.newsSection}`}>
            {
                children&&twoCols&&children.map( (child, index) => {
                    return (
                        <div key={index} className={`${styles.col}  ${(index==0) ? styles.w100 : styles.w30}`}>
                            {child}
                        </div>
                    )
                })
            }
            {
                children&&multiCols&&children.map( (child, index, array) => {
                    if(index != 0 && index%2 != 0){
                        return
                    }
                    return (
                        <div key={index} className={`${styles.col} ${utilStyles.heightAuto} ${utilStyles.dFlex} ${styles.w100} ${utilStyles.customScroll}` }>
                            <div className={`${styles.w100} ${styles.subCol}`}>{array[index]}</div>
                            <div className={`${styles.w100} ${styles.subCol}`}>{array[index+1]}</div>
                        </div>
                    )
                })
            }
            {
                children&&equalCols&&threeCols&&children.map( (child, index) => {
                    return (
                        <div className={`${styles.col}  ${styles.w100}`} key={index}>
                            { child }
                        </div>
                    )
                })
            }
            {
                children&&!equalCols&&threeCols&&children.map( (child, index, array) => {
                    if(index == 2) {
                        return
                    }
                    if(index == 0){
                        return (                        
                            <div key={index} className={`${styles.col} ${styles.w100}`}>
                                {child}
                            </div>
                        )
                    }else{
                        return (
                            <div key={index} className={`${styles.col} ${styles.w100} ${utilStyles.dFlex}`}>
                                <div className={`${styles.subCol} ${utilStyles.customScroll} ${styles.w100}`}>
                                    {array[index]}
                                </div>
                                <div className={`${styles.subCol} ${utilStyles.customScroll} ${styles.w100}`}>
                                    {array[index+1]}
                                </div>
                            </div> 
                        )
                    }
                })
            }
        </section>
    )
}

