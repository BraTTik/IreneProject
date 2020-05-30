import style from './style.module.css'

export default function Menu({ children, className }){
    
    return(
        <nav className={className || ''}>
            <ul className={style.nav}>
                { children }
            </ul>
        </nav>
    )
}