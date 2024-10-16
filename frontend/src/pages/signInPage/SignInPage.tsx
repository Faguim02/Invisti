import style from './style.module.css'
import InputLabel from "../../components/Input/InputLabel";
import Button from '../../components/button/Button';
import background_login from '../../assets/background_login.jpg'
import logo from '../../assets/LOGO.svg'

export default function SignInPage() {
    return (
        <div className={style.backgroundContainerSignIn}>
            <img src={background_login} alt="bg" className={style.bgContainer}/>
            <form>
                <figure>
                    <img src={logo} alt="logo" className={style.logo}/>
                </figure>
                <InputLabel labeText="seu email" pleaceholder="fulane@email.com"/>
                <InputLabel labeText="sua senha" pleaceholder="********"/>
                <Button>Entrar na conta</Button>
            </form>
        </div>
    )
}