import logo from '../../assets/LOGO.svg'
import Button from '../button/Button'
import style from './style.module.css'

export default function HeaderComponent() {
    return (
        <header className={style.HeaderComponent}>
            <img src={logo} alt="logo" />
            <Button style={{height: 60}}>Começar</Button>
        </header>
    )
}