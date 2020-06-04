import Menu                 from '../util/menu/menu';
import utilStyles           from '../../styles/utilStyles.module.css';
import styles               from './navigation.module.css';
import navigationItems      from '../../assets/menu_links/navigation_menu_items';
import Link                 from 'next/link'
import React, { useState }  from 'react'


export default function Navigation(){

    const [isOpen, setIsOpen] = useState(false);

    const clickHandle = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }

       
    return (
        <div>
            <div className={`${styles.navigation} ${utilStyles.dFlex}`}>
                <div className={` ${utilStyles.pointer} ${utilStyles.dFlex} ${styles.sandwichWrap}`} onClick = {() => clickHandle()}>
                    <span className={styles.sandwichButton}></span>
                </div>
                <Menu className={styles.navMenu}>
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

        )

}

