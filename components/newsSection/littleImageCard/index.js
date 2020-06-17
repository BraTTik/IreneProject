import styles from './littleImageCardStyle.module.css'
import utilStyles from '../../../styles/utilStyles.module.css'
import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import { translateCategory } from '../../../lib/helpers'

export default function LittleImageCard({news}){
    const {id, title, category, image} = news;
    const [height, setHeight] = useState();
    const pathCategory = translateCategory(category);
    const link = `/${pathCategory}/${id}`;
    useEffect(() => {
        getHeight();
        window.addEventListener('resize', getHeight);
        return () => {
            window.removeEventListener('resize', getHeight);
        }
    });
    function getHeight(){
        const elem = document.querySelector('.littleImageCard');
        const elemStyles = getComputedStyle(elem, null);
        setHeight(elemStyles.width);
    }
    return (

        <Link href={link} as={link}>
            <a>
                <div className={`${styles.wrap} ${utilStyles.pointer}`}>
        
                    <div className={`${styles.card} littleImageCard ${image&&'image'}`}>
                        <h3 className={`${styles.title} ${utilStyles.textMd}`}>{title}</h3>
                        <span className={`${styles.category} ${utilStyles.textSm} ${utilStyles.textThin}`}>
                            {category}
                        </span>
                    </div>
                    {/* Dynamic styles */}
                    <style jsx>{`
                        p{
                            margin: 0;
                        }
                        .littleImageCard{
                            height: ${height}
                        }
                        .image{
                            background-image: url(${image});
                        }
                        @media screen and (max-width: 450px){
                            .littleImageCard{
                                height: 35vw;
                            }
                        }
                    `}</style>
                </div>
            </a>
        </Link>
    )
}