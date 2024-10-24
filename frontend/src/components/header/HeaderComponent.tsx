import logo from '../../assets/LOGO.svg'
import style from './style.module.css'

export default function HeaderComponent() {
    return (
        <header className={style.HeaderComponent}>
            <img src={logo} alt="logo" />
        </header>
    )
}