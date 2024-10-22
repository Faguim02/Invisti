import HeaderComponent from "../../components/header/HeaderComponent";
import style from './style.module.css'
import { FaArrowDown, FaArrowUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdAdd, MdOutlineClear } from "react-icons/md";
import Apresentation from "./Apresentation";
import { useState } from "react";
import Button from "../../components/button/Button";
import { DateSelectService } from "../../service/DateSelectService";
import Cookies from "ts-cookies";
import { ReceiveMoneyService } from "../../service/ReceiveMoneyService";
import { useQuery } from "react-query";
import { Expense, Income, ReceiveMoney } from "../../data/Dtos";
import { IncomeService } from "../../service/IncomeService";
import { ExpenseService } from "../../service/ExpenseService";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, useDisclosure } from "@chakra-ui/react";
import InputLabel from "../../components/Input/InputLabel";

interface dataInitial {
    receive: ReceiveMoney,
    income: Income,
    expense: Expense
}

export default function Home() {

    const [receiveMonth, setReceiveMonth] = useState<ReceiveMoney[]>([]);
    const [incomeMonth, setIncomeMonth] = useState<Income[]>([]);
    const [expenseMonth, setExpenseMonth] = useState<Expense[]>([]);
    const [selectTypeMonth, setSelectTypeMonth] = useState<string>("income")

    const [amount, setAmount] = useState<number>(0);
    const [describe, setDescribe] = useState<string>("");
    
    const [month, setMonth] = useState<string>("jan");
    const [year, setYear] = useState<number>(2024);

    const [buttonFloatActive, setButtonFloatActive] = useState<boolean>(false)

    const [modayType, setModalType] = useState<string>("Receita")
    const { isOpen, onClose, onOpen } = useDisclosure()

    const { data } = useQuery({
        queryKey: ['money'],
        queryFn: LoadInfoInitial
    })

    async function handleNextDate() {
        const dateNext = new DateSelectService().nextMonth(month, year)
        setMonth(dateNext.month)
        setYear(dateNext.year)

        if(selectTypeMonth == "income") {
            const res = await new IncomeService().findIncomeForMonth("0", "0") as Income[]
            setIncomeMonth(res)
        }
    }

    function handleBackDate() {
        const dateNext = new DateSelectService().backMonth(month, year)
        setMonth(dateNext.month)
        setYear(dateNext.year)
        console.log(data)
    }

    async function LoadInfoInitial(): Promise<dataInitial> {
        const findAllMoney = await new ReceiveMoneyService().findAllMoney();
        const findAllIncome = await new IncomeService().findAllIncome();
        const findAllExpense = await new ExpenseService().findAllExpense();
        
        return {
            expense: findAllExpense as Expense,
            income: findAllIncome as Income,
            receive: findAllMoney as ReceiveMoney
        }
    }

    async function generateNewCurrent(e: any) {
        e.preventDefault()
        
        if(modayType == "Receita") {
            const incomeData = {
                amount: amount,
                description: describe
            } as Income

            const incoemeRes = await new IncomeService().incomeMoney(incomeData)

            console.log(incoemeRes);
            return            
        }

        const expenseData = {
            amount: amount,
            description: describe
        } as Expense

        const expenseRes = await new ExpenseService().expenseMoney(expenseData)

        console.log(expenseRes)
    }

    if(!Cookies.get('access_token')) {
        return (
            <div className={style.home}>
                <HeaderComponent/>
                <Apresentation/>
            </div>
        )
    }

    return (
        <div className={style.home}>
            
            <div className={style.buttonFloat}>
                {buttonFloatActive && (
                    <>
                        <Button style={{backgroundColor: '#f3f3f3'}} onClick={()=>{
                            onOpen()
                            setModalType("Receita")
                        }}><FaArrowUp size={30} color="#29BF12"/></Button>
                        <Button style={{backgroundColor: '#f3f3f3'}} onClick={()=>{
                            onOpen()
                            setModalType("Despesa")
                        }}><FaArrowDown size={30} color="#F21B3F"/></Button>
                    </>
                )}
                <Button onClick={()=>setButtonFloatActive(!buttonFloatActive)}>
                    {buttonFloatActive ? (<MdOutlineClear size={30}/>):(<MdAdd size={30}/>)}
                </Button>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
                <ModalContent>
                    <ModalCloseButton/>
                    <ModalHeader>
                        Nova {modayType}
                    </ModalHeader>
                    <ModalBody>

                        <form className={style.formModalHome} onSubmit={generateNewCurrent}>
                            <InputLabel labeText="Valor" onChange={(e)=>setAmount(e.target.value)} value={amount?.toString()} pleaceholder="10.50"/>
                            <InputLabel labeText="Com o que?" onChange={(e)=>setDescribe(e.target.value)} value={describe} pleaceholder="diga aqui"/>
                            <Button>Gerar {modayType}</Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <HeaderComponent/>

            <section className={style.receiveContainer}>
                <span>Valor atual</span>
                <h3>R$ {Number(data?.receive.balance).toFixed(2)}</h3>
                <div className={style.divider}></div>
            </section>
            <article className={style.statusGroup}>
                <section className={style.statusContainer}>
                    <FaArrowUp color="#29BF12" size={40}/>
                    <div>
                        <span>receita do mês</span>
                        <h4>R$ {Number(data?.income.amount).toFixed(2)}</h4>
                    </div>
                </section>
                <section className={style.statusContainer}>
                    <FaArrowDown color="#F21B3F" size={40}/>
                    <div>
                        <span>despesa do mês</span>
                        <h4>R$ {Number(data?.expense.amount).toFixed(2)}</h4>
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
                        <h4>R$ 10</h4>
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