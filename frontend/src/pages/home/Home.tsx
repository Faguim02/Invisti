import HeaderComponent from "../../components/header/HeaderComponent";
import style from './style.module.css'
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Apresentation from "./Apresentation";
import { useState } from "react";

export default function Home() {

    const [receive, setReceive] = useState<number>(100.1);
    const [income, setIncome] = useState<number>(50.2);
    const [expense, setExpense] = useState<number>(15.3);

    return (
        <div className={style.home}>
            <HeaderComponent/>
            {/* //<Apresentation/> */}

            <section className={style.receiveContainer}>
                <span>Valor atual</span>
                <h3>R$ {receive.toFixed(2)}</h3>
                <div className={style.divider}></div>
            </section>
            <article className={style.statusGroup}>
                <section className={style.statusContainer}>
                    <FaArrowUp color="#29BF12" size={40}/>
                    <div>
                        <span>receita do mês</span>
                        <h4>R$ {income.toFixed(2)}</h4>
                    </div>
                </section>
                <section className={style.statusContainer}>
                    <FaArrowDown color="#F21B3F" size={40}/>
                    <div>
                        <span>receita do mês</span>
                        <h4>R$ {expense.toFixed(2)}</h4>
                    </div>
                </section>
            </article>
        </div>
    )
}