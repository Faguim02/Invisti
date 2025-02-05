import Button from '../../components/button/Button'
import people from '../../assets/people.jpg'
import cell from '../../assets/cell.svg'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'

export default function Apresentation() {

    const navigate = useNavigate()

    return (
        <>
            <figure className={style.bgApresentation}>
                <section>
                    <h2>Saiba para onde seu dinheiro está correndo</h2>
                    <Button onClick={()=>navigate('/signUp')}>Criar uma conta</Button>
                    <Button onClick={()=>navigate('/calculator')}>Simular investimentos</Button>
                </section>
            </figure>

            

            <section className={style.tyocard}>
                <img src={people} alt="people" />

                <article>
                    <h3>
                    Tenha o controle sobre seus gastos e reiceitas geradas durante o mês
                    </h3>

                    <p>
                    Pode parecer besteira, mas isso ajuda a quem quer começar a investir, juntar dinheiro pra chegar em algum objetivo, seja uma casa, um aoutomovel, ou quem deseja desfazer de gastos desnecesarios durante o mês.
                    </p>
                </article>
            </section>

            <section className={style.treecard}>
                <img src={cell} alt="cell" />

                <article>
                    <h3>
                    Baixe o Invist no seu dispositivo android
                    </h3>

                    <p>
                    Tenha o Invist App agora na palma de sua mão
                    </p>

                    <Button>Download Apk</Button>
                </article>
            </section>
        </>
    )
}