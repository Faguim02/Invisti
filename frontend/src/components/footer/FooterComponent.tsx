import style from './style.module.css'
import { FaGithub, FaGlobeAmericas, FaInstagram, FaLinkedin } from "react-icons/fa";
import InputLabel from "../Input/InputLabel";
import logo from '../../assets/LOGO.svg'
import { Link } from 'react-router-dom';

export default function FooterComponent() {
    return (
        <footer className={style.FooterComponent}>
                <section className={style.container}>
                    <section className={style.containerLinks}>
                        <section>
                            <img src={logo} alt="logo" />
                            <p>
                            Controle seu dinheiro e tenha visão de onde e como investir
                            </p>
                        </section>
                        <nav>
                            <h2>Links</h2>
                            <Link to={'/'}>Inicio</Link>
                            <Link to={'/signUp'}>Cadastrar</Link>
                            <Link to={'/calculator'}>Simular</Link>
                        </nav>
                    </section>
                    <section className={style.containerContact}>
                        <form>
                            <InputLabel labeText="Enviar email" pleaceholder="Fale comigo" value="" onChange={() => {}}/>
                        </form>
                        <ul>
                            <li>
                                <a href="https://www.instagram.com/faguim_02">
                                    <FaInstagram />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.github.com/faguim02">
                                    <FaGithub/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/fagner-muniz-de-s%C3%A1-6b1211215">
                                    <FaLinkedin />
                                </a>
                            </li>
                        </ul>
                    </section>
                </section>
                <section className={style.copyright}>
                    <span>&copy; 2025 Invist</span>
                    <ul>
                        <li>Termos e condições</li>
                        <li>Politica de privacidade</li>
                        <li> <FaGlobeAmericas/> Português brasil</li>
                    </ul>
                </section>
        </footer>
    )
}