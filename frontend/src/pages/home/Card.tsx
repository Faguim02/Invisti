import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import style from './style.module.css'
import { FormatMoneyService } from "../../service/FormatMoneyService";

interface CardProps {
    type: string,
    description: string,
    amount: number,
    date: string,
    isNegative?: boolean
}

export default function Card({description, amount, date, isNegative}:CardProps) {

    const formatMoney = new FormatMoneyService();

    return (
        <li>
            <div className={style.icon}>
                {isNegative ? <FaArrowDown color="#FF0000" size={20}/> : <FaArrowUp color="#29BF12" size={20}/>}
                <div>
                    <span className={style.description}>{description}</span>
                    <span className={style.value}>R$ {formatMoney.formatMoney(Number(amount))}</span>
                </div>
            </div>
            <data className={style.date}>
                {formatMoney.formatDate(date)}
            </data>
        </li>
    )
}