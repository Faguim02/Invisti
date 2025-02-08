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
import Card from "./Card";
import { FormatMoneyService } from "../../service/FormatMoneyService";

interface dataInitial {
    receive: ReceiveMoney,
    income: Income,
    expense: Expense
}

export default function Home() {

    const [listHistoryForMonth, setListHistoryForMonth] = useState<Array<Expense | Income>>([])
    const [selectTypeMonth, setSelectTypeMonth] = useState<string>("ganhos")

    const [amount, setAmount] = useState<number>(0);
    const [describe, setDescribe] = useState<string>("");
    
    const [month, setMonth] = useState<string>("jan");
    const [year, setYear] = useState<number>(2024);

    const [buttonFloatActive, setButtonFloatActive] = useState<boolean>(false)

    const [modayType, setModalType] = useState<string>("Receita")
    const { isOpen, onClose, onOpen } = useDisclosure()

    const formatMoney = new FormatMoneyService()

    const { data } = useQuery({
        queryKey: ['money'],
        queryFn: LoadInfoInitial
    })

    async function handleNextDate() {
        const dateNext = new DateSelectService().nextMonth(month, year)
        const monthNumber = new DateSelectService().covertMonthTextInNumber(dateNext.month)
        console.log(monthNumber, dateNext.year)
        if(!(new DateSelectService().isDateSelectedExist(monthNumber, dateNext.year))) {
            return
        }
        setMonth(dateNext.month)
        setYear(dateNext.year)

        let listHistory = [];

        if(selectTypeMonth == "ganhos") {
            listHistory = await new IncomeService().findIncomeForMonth(monthNumber, year) as Income[]
        } else if(selectTypeMonth == "despesas") {
            listHistory = await new ExpenseService().findExpenseForMonth(monthNumber, year) as Expense[]
        } else {
            const res = await new ReceiveMoneyService().findMoneyForMonth(monthNumber, year) as ReceiveMoney[]
            for(let i = 0; i <= res.length; i++) {
                const newObject = {
                    amount: res[i].balance,
                    date: res[i].date,
                    description: "alteração",
                    id: res[i].id,
                    user_id: res[i].user_id
                } as Income
                listHistory.push(newObject)
            }
        }
        
        setListHistoryForMonth(listHistory);
        console.log(listHistory)
    }

    async function handleBackDate() {
        const dateNext = new DateSelectService().backMonth(month, year)
        setMonth(dateNext.month)
        setYear(dateNext.year)

        const monthNumber = new DateSelectService().covertMonthTextInNumber(month)
        let listHistory = [];

        if(selectTypeMonth == "ganhos") {
            listHistory = await new IncomeService().findIncomeForMonth(monthNumber, year) as Income[]
        } else if(selectTypeMonth == "despesas") {
            listHistory = await new ExpenseService().findExpenseForMonth(monthNumber, year) as Expense[]
        } else {
            const res = await new ReceiveMoneyService().findMoneyForMonth(monthNumber, year) as ReceiveMoney[]
            for(let i = 0; i <= res.length; i++) {
                const newObject = {
                    amount: res[i].balance,
                    date: res[i].date,
                    description: "alteração",
                    id: res[i].id,
                    user_id: res[i].user_id
                } as Income
                listHistory.push(newObject)
            }
        }

        setListHistoryForMonth(listHistory);
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
                <h3>R$ {formatMoney.formatMoney(Number(data?.receive.balance))}</h3>
                <div className={style.divider}></div>
            </section>

            <article className={style.statusGroup}>
                <section className={style.statusContainer}>
                    <FaArrowUp color="#29BF12" size={40}/>
                    <div>
                        <span>receita do mês</span>
                        <h4>R$ {formatMoney.formatMoney(Number(data?.income.amount))}</h4>
                    </div>
                </section>
                <section className={style.statusContainer}>
                    <FaArrowDown color="#F21B3F" size={40}/>
                    <div>
                        <span>despesa do mês</span>
                        <h4>R$ {formatMoney.formatMoney(Number(data?.expense.amount))}</h4>
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
                    <button onClick={()=>setSelectTypeMonth("ganhos")}>receitas</button>
                    <button onClick={()=>setSelectTypeMonth("despesas")}>despesas</button>
                    <button onClick={()=>setSelectTypeMonth("em mãos")}>em mão</button>
                </section>

                <section className={style.headerHistory}>
                    <h4>{selectTypeMonth}</h4>
                    <div>
                        <span>Total:</span>
                        <h4>R$ 10</h4>
                    </div>
                </section>

                <ul className={style.listHistory}>
                    {
                        listHistoryForMonth.map(item => <Card amount={Number(item.amount)} date="20 jan 2024" description="test" type={selectTypeMonth}/>)
                    }
                </ul>
            </article>
            
        </div>
    )
}