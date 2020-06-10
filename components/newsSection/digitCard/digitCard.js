import styles from './digitCardStyles.module.css';
import utilStyles from '../../../styles/utilStyles.module.css';
import React, {useState, useEffect} from 'react';

export default function DigitCard({title, description}){
    const regex = /([\d,.]+) ([а-яА-ЯёЁ]+)/ug
    const matches = [...title.matchAll(regex)];
    const [exp, digit, word] = (matches[0]);

    const [height, setHeight] = useState();

    useEffect(() => {
        getHeight();
        window.addEventListener('resize', getHeight);
        return () => {
            window.removeEventListener('resize', getHeight);
        }
    });

    function getHeight(){
        const elem = document.querySelector('.digitCard');
        const elemStyles = getComputedStyle(elem, null);
        setHeight(elemStyles.width);
    }
    
    return(
        <div className={`${styles.digitCard} digitCard`}>
            <div className={`${styles.textWrap} ${utilStyles.dFlex}`}>
                <h3 className={`${styles.title}`}>
                    <span className={`${utilStyles.textExtraLg}`}>{digit}</span>
                    <span> {word}</span>
                </h3>
                <p className={`${styles.description}`}>{description}</p>
            </div>
            <style jsx>{`
                    p{
                        margin: 0;
                    }
                    .digitCard{
                        height: ${height}
                    }
                    @media screen and (max-width: 450px){
                        .digitCard{
                            height: 35vw;
                        }
                    }
                `}</style>
        </div>
    )
}