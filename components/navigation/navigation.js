import Menu                 from '../util/menu/menu';
import utilStyles           from '../../styles/utilStyles.module.css';
import styles               from './navigation.module.css';
import navigationItems      from '../../assets/menu_links/navigation_menu_items';
import Link                 from 'next/link'
import React, { useState, useEffect }  from 'react'


export default function Navigation(){

    const [isOpen, setIsOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [position, setPosition] = useState();

    useEffect(() => {
        const navigationElement = document.querySelector('.navigationWrap');
        const headerElement = document.querySelector('header');

        // определяем высоту header
        const headerHeight = headerElement.getBoundingClientRect().height;
        // определяем высоту navigation
        const navHeight = navigationElement.getBoundingClientRect().height;

        //определяем начальную позицию 
        const position = headerHeight - navHeight;

        setPosition(position);

        const handler = () => {
            scrollHandler();
        }

        const resizeHandler = () => {
            const headerHeight = headerElement.getBoundingClientRect().height;
            const navHeight = navigationElement.getBoundingClientRect().height;
            
            const position = headerHeight - navHeight;

            setPosition(position);
        }
        document.addEventListener('scroll', handler)
        window.addEventListener('resize', resizeHandler);
        return () => {
            document.removeEventListener('scroll', handler);
            window.removeEventListener('resize', resizeHandler);
        }
    })

    const clickHandle = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }



    const scrollHandler = () => {
        let documentScroll = self.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        if(position-documentScroll <= 0){
            setIsFixed(true);
        }else if(position-documentScroll > 0){
            setIsFixed(false);
        }
    }
       
    return (
        <div className={`navigationWrap ${isFixed ? styles.fixed : ''}`}>
            <div className={`${isFixed ? utilStyles.container : '' }`}>
                <div className={`${styles.navigation} ${utilStyles.dFlex}`}>
                    <div className={` ${utilStyles.pointer} ${utilStyles.dFlex} ${styles.sandwichWrap}`} onClick = {() => clickHandle()}>
                        <span className={styles.sandwichButton}></span>
                    </div>
                    <div className={`${styles.littleLogo} ${isFixed ? utilStyles.dBlock : utilStyles.dNone}`}>
                        П<span className={styles.letterSpaceFix}>У</span>ЛЬСАР
                    </div>
                    <Menu className={styles.navMenu} items = {navigationItems}>
                        {navigationItems.map( (navItem, key) => {
                            return (
                                <li key={key} className={`${utilStyles.navItem} ${utilStyles.textDark} ${utilStyles.textSm}`}>
                                    <Link href={navItem.href}>
                                        <a>
                                            {navItem.title}
                                        </a>
                                    </Link>
                                </li>
                            )
                        })}
                    </Menu>
                    <div className={`${styles.searchWrap}`}>
                        <input name="search" id="search" placeholder="Поиск"/>
                    </div>
                </div>
                <Menu className={`${styles.navMenuMobile} ${isOpen ? styles.open : ''}`}>
                    {navigationItems.map( (navItem, key) => {
                        return (
                            <li key={key} className={`${styles.navItemMobile} ${utilStyles.textDark} ${utilStyles.textSm}`}>
                                <Link href={navItem.href}>
                                    <a>
                                        {navItem.title}
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                </Menu>
            </div>
        </div>

        )

}

