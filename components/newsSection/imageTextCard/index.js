import styles from './imageTextStyle.module.css';
import utilStyles from '../../../styles/utilStyles.module.css'
import Link from 'next/link';


export default function ImageTextCard(props){
    const {id, title, image, content, category} = props;
    return (
        <div className={`${styles.wrap} ${utilStyles.pointer}`}>
            <Link href={`/${id}`} as={`/${id}`}>
            	<div className={`${styles.card}`}>
            	    <div className={`${styles.imgWrap}`}>
            	        <img src={image} alt={id}/>
            	    </div>
            
            	    <div className={`${styles.text}`}>
            	        <div className={`${styles.title} ${utilStyles.textBold}`}>
            	            {title}
            	        </div>
            	        <div className={`${styles.content}`} dangerouslySetInnerHTML={ {__html: content.htmlContent} } />
            	    </div>
            
            	    <div className={`${styles.footer} ${utilStyles.dFlex}`}>
                        <div>
                            {category}
                        </div>
                        <div>
                            Comms
                        </div>
            	    </div>
            	</div>
                    
            </Link>
        </div>
    )
}