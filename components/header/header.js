import styles from './header.module.css'
import utilStyles from '../../styles/utilStyles.module.css'
import Menu from '../../components/util/menu/menu'
import socialItmes from '../../assets/menu_links/social_menu_items'
import Link from 'next/link'
import Navigation from '../../components/navigation/navigation'

export default function Header(){
    return (
        <header className={styles.header}>
            <div className={utilStyles.container}>

                <div className={`${styles.loginWrap} ${utilStyles.dFlex} ${utilStyles.flexEnd}`}>
                    <Menu>
                        <li className={`${utilStyles.navItem} ${utilStyles.pointer} ${utilStyles.textSm} ${utilStyles.textNormal}`}>Вход</li>
                        <li className={`${utilStyles.navItem} ${utilStyles.pointer} ${utilStyles.textSm} ${utilStyles.textNormal}`}>Регистрация</li>
                    </Menu>
                </div>

                <div className={styles.body}>
                    {/** Logo */}
                    <div className={styles.logo}>
                        <h1 className={`${styles.heading} ${utilStyles.inlineBlock} ${utilStyles.relative}`}>
                            <Link href="/">
                                <a className={styles.logoLink}><span style={{"whiteSpace": "nowrap"}}>П<span className={styles.letterSpaceFix}>у</span>льсар</span></a>
                            </Link>
                            <span className={styles.imgWrap}>
                                <Link href="/">
                                    <a><img src="/images/icons/sputnik-icon.png"/></a>
                                </Link>
                            </span>
                        </h1>
                    </div>

                    <Menu className={styles.socialMenu}>
                        { /* li-items */ 
                            socialItmes.map( (item) => {
                                return (
                                    <li key={item.title} className={`${styles.socialItem}`}>
                                        <a href={item.href}>
                                            <img src={item.src}/>
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </Menu>
                </div>
                
                <Navigation />
            </div>
        </header>
    )
}