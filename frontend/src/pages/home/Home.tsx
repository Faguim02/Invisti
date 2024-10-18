import HeaderComponent from "../../components/header/HeaderComponent";
import style from './style.module.css'
import { FaArrowDown, FaArrowUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdAdd, MdOutlineClear } from "react-icons/md";
import Apresentation from "./Apresentation";
import { useState } from "react";
import Button from "../../components/button/Button";
import { DateSelectService } from "../../service/DateSelectService";

export default function Home() {

    const [receive, setReceive] = useState<number>(100.1);
    const [income, setIncome] = useState<number>(50.2);
    const [expense, setExpense] = useState<number>(15.3);
    
    const [month, setMonth] = useState<string>("jan");
    const [year, setYear] = useState<number>(2024);

    const [buttonFloatActive, setButtonFloatActive] = useState<boolean>(false)

    function handleNextDate() {
        const dateNext = new DateSelectService().nextMonth(month, year)
        setMonth(dateNext.month)
        setYear(dateNext.year)
    }

    function handleBackDate() {
        const dateNext = new DateSelectService().backMonth(month, year)
        setMonth(dateNext.month)
        setYear(dateNext.year)
    }

    return (
        <div className={style.home}>
            
            <div className={style.buttonFloat}>
                {buttonFloatActive && (
                    <>
                        <Button style={{backgroundColor: '#f3f3f3'}}><FaArrowUp size={30} color="#29BF12"/></Button>
                        <Button style={{backgroundColor: '#f3f3f3'}}><FaArrowDown size={30} color="#F21B3F"/></Button>
                    </>
                )}
                <Button onClick={()=>setButtonFloatActive(!buttonFloatActive)}>
                    {buttonFloatActive ? (<MdOutlineClear size={30}/>):(<MdAdd size={30}/>)}
                </Button>
            </div>

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

            <article className={style.historyForDateContainer}>
                <section className={style.selectDate}>
                    <button onClick={handleBackDate}> <FaChevronLeft size={20} color="#444444"/> </button>
                    <span>{month}-{year}</span>
                    <button onClick={handleNextDate}> <FaChevronRight size={20} color="#444444"/> </button>
                </section>

                <section className={style.menuOptionsSection}>
                    <button>receitas</button>
                    <button>despesas</button>
                    <button>em mão</button>
                </section>

                <section className={style.headerHistory}>
                    <h4>receitas</h4>
                    <div>
                        <span>Total:</span>
                        <h4>R$ {income.toFixed(2)}</h4>
                    </div>
                </section>

                <ul className={style.listHistory}>
                    <li>
                        <div className={style.icon}>
                            <FaArrowUp color="#29BF12" size={20}/>
                            <div>
                                <span className={style.description}>triguinho</span>
                                <span className={style.value}>R$ 50,00</span>
                            </div>
                        </div>
                        <data className={style.date}>
                            20 jan 2024
                        </data>
                    </li>

                    <li>
                        <div className={style.icon}>
                            <FaArrowUp color="#29BF12" size={20}/>
                            <div>
                                <span className={style.description}>triguinho</span>
                                <span className={style.value}>R$ 50,00</span>
                            </div>
                        </div>
                        <data className={style.date}>
                            20 jan 2024
                        </data>
                    </li>

                    <li>
                        <div className={style.icon}>
                            <FaArrowUp color="#29BF12" size={20}/>
                            <div>
                                <span className={style.description}>triguinho</span>
                                <span className={style.value}>R$ 50,00</span>
                            </div>
                        </div>
                        <data className={style.date}>
                            20 jan 2024
                        </data>
                    </li>

                </ul>
            </article>
            
        </div>
    )
}