import styles from './footerStyles.module.css';
import utilStyles from '../../styles/utilStyles.module.css';
import Menu from '../util/menu/menu';
import menuItems from '../../assets/menu_links/footer_menu_items';
import Link from 'next/link';

export default function Footer(){
    return (
        <footer className={`${styles.footer}`}>
            <div className={`${utilStyles.container}`}>
                <div>
                    <Menu className={styles.footerMenu}>
                        {menuItems.map( ({title, href}, index) => {
                            return (
                                <li className={`${utilStyles.navItem} ${utilStyles.textSm} ${utilStyles.textWhite}`} key={'footer'+index}>
                                    <Link href={href}>
                                        <a>
                                            {title}
                                        </a>
                                    </Link>
                                </li>
                            )
                        })}
                    </Menu>
                </div>
                <div className={styles.copyright}>
                    <small>&copy;2017. Все права защищены.</small>
                </div>
            </div>
        </footer>
    )
}