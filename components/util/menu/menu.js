import style from './menuStyles.module.css'

export default function Menu({ children, className, items}){
    return(
        <nav className={` ${className || ''}`}>
            <ul className={`${style.nav} `}>
                { children }
            </ul>
        </nav>
    )
}