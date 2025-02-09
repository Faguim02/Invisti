import { useNavigate } from 'react-router-dom'
import logo from '../../assets/LOGO.svg'
import style from './style.module.css'

interface Props {
    isAuthenticated?: boolean
}

export default function HeaderComponent({isAuthenticated}:Props) {

    const navigate = useNavigate()

    return (
        <header className={style.HeaderComponent}>
            <img src={logo} alt="logo" />

            {isAuthenticated ? <button onClick={() => navigate('/home')}>Sair</button> : <button onClick={() => navigate('/signUp')}>Criar conta</button>}
        </header>
    )
}