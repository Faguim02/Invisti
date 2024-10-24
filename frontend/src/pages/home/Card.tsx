import { FaArrowUp } from "react-icons/fa";
import style from './style.module.css'

interface CardProps {
    type: string,
    description: string,
    amount: number,
    date: string
}

export default function Card({type, description, amount, date}:CardProps) {
    return (
        <li>
            <div className={style.icon}>
                <FaArrowUp color="#29BF12" size={20}/>
                <div>
                    <span className={style.description}>{description}</span>
                    <span className={style.value}>R$ {amount}</span>
                </div>
            </div>
            <data className={style.date}>
                {date}
            </data>
        </li>
    )
}