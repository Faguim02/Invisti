import style from './style.module.css'
import InputLabel from "../../components/Input/InputLabel";
import Button from '../../components/button/Button';
import background_login from '../../assets/background_login.jpg'
import logo from '../../assets/LOGO.svg'
import { useState } from 'react';
import { UserDto } from '../../data/Dtos';
import { UserService } from '../../service/UserService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import LinkComponent from '../../components/link/Link';

export default function SignUpPage() {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate()
    const toast = useToast()

    async function submitSignUp(e: any) {
        e.preventDefault()

        const data = { email, password, name} as UserDto

        const userService = await new UserService().signUp(data);

        console.log(userService);

        if(userService.success) {
            toast({
                title: 'Conta criada com sucesso',
                description: 'Agora faça o login com a conta que você criou',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })

            navigate('/signIn')
            return
        }

        setEmail('')
        setPassword('')

        toast({
            title: userService.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
        
    }


    return (
        <div className={style.backgroundContainerSignIn}>
            <img src={background_login} alt="bg" className={style.bgContainer}/>
            <form onSubmit={submitSignUp}>
                <figure>
                    <img src={logo} alt="logo" className={style.logo}/>
                </figure>
                <InputLabel labeText="seu nome" pleaceholder="fulane de tal" onChange={(e)=>setName(e.target.value)} value={name} required/>
                <InputLabel labeText="seu email" pleaceholder="fulane@email.com" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                <InputLabel labeText="sua senha" pleaceholder="********" onChange={(e)=>setPassword(e.target.value)} value={password} type='password' required/>
                <Button>Criar conta</Button>
                <LinkComponent href='/signIn'>Já possui uma conta?</LinkComponent>
            </form>
        </div>
    )
}