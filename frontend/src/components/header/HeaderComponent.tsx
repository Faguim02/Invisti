import { useNavigate } from 'react-router-dom'
import logo from '../../assets/LOGO.svg'
import style from './style.module.css'

export default function HeaderComponent() {

    const navigate = useNavigate()

    return (
        <header className={style.HeaderComponent}>
            <img src={logo} alt="logo" />
            <button onClick={() => navigate('/signUp')}>Criar conta</button>
        </header>
    )
}