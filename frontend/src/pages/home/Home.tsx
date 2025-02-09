import HeaderComponent from "../../components/header/HeaderComponent";
import style from './style.module.css'
import { FaArrowDown, FaArrowUp, FaCalculator, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdAdd, MdOutlineClear } from "react-icons/md";
import Apresentation from "./Apresentation";
import { useState } from "react";
import Button from "../../components/button/Button";
import { DateSelectService } from "../../service/DateSelectService";
import Cookies from "ts-cookies";
import { ReceiveMoneyService } from "../../service/ReceiveMoneyService";
import { useQuery } from "react-query";
import { Expense, ExpenseTransactionsForMonthDto, Income, IncomeTransactionsForMonthDto, ReceiveMoney, ReceiveMoneyTransactionsForMonthDto, TransactionsForMonthDto } from "../../data/Dtos";
import { IncomeService } from "../../service/IncomeService";
import { ExpenseService } from "../../service/ExpenseService";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, useDisclosure } from "@chakra-ui/react";
import InputLabel from "../../components/Input/InputLabel";
import Card from "./Card";
import { FormatMoneyService } from "../../service/FormatMoneyService";
import FooterComponent from "../../components/footer/FooterComponent";
import { useNavigate } from "react-router-dom";

interface dataInitial {
    receive: ReceiveMoney,
    income: Income,
    expense: Expense
}

export default function Home() {

    const [transactionsForMonth, setTransactionsForMonth] = useState<TransactionsForMonthDto>({} as TransactionsForMonthDto)
    const [selectTypeMonth, setSelectTypeMonth] = useState<string>("ganhos")

    const [amount, setAmount] = useState<number>(0);
    const [describe, setDescribe] = useState<string>("");
    
    const [month, setMonth] = useState<string>("jan");
    const [year, setYear] = useState<number>(2024);

    const [buttonFloatActive, setButtonFloatActive] = useState<boolean>(false)

    const [modayType, setModalType] = useState<string>("Receita")
    const { isOpen, onClose, onOpen } = useDisclosure()

    const formatMoney = new FormatMoneyService()

    const navigate = useNavigate()

    const { data, refetch } = useQuery({
        queryKey: ['money'],
        queryFn: LoadInfoInitial
    })

    async function handleNextDate() {
        const dateNext = new DateSelectService().nextMonth(month, year)
        const monthNumber = new DateSelectService().covertMonthTextInNumber(dateNext.month)
        
        if(!(new DateSelectService().isDateSelectedExist(monthNumber, dateNext.year))) {
            return
        }
        setMonth(dateNext.month)
        setYear(dateNext.year)

        let incomesRes = await new IncomeService().findIncomeForMonth(monthNumber, year) as IncomeTransactionsForMonthDto
        let expensesRes = await new ExpenseService().findExpenseForMonth(monthNumber, year) as ExpenseTransactionsForMonthDto
        let receivesRes = await new ReceiveMoneyService().findMoneyForMonth(monthNumber, year) as ReceiveMoneyTransactionsForMonthDto

        const transactionsForMonth = {
            incomes: incomesRes,
            expenses: expensesRes,
            receives: receivesRes
        } as TransactionsForMonthDto

        setTransactionsForMonth(transactionsForMonth)
    }

    async function handleBackDate() {
        const dateNext = new DateSelectService().backMonth(month, year)
        setMonth(dateNext.month)
        setYear(dateNext.year)

        const monthNumber = new DateSelectService().covertMonthTextInNumber(dateNext.month)

        let incomesRes = await new IncomeService().findIncomeForMonth(monthNumber, year) as IncomeTransactionsForMonthDto
        let expensesRes = await new ExpenseService().findExpenseForMonth(monthNumber, year) as ExpenseTransactionsForMonthDto
        let receivesRes = await new ReceiveMoneyService().findMoneyForMonth(monthNumber, year) as ReceiveMoneyTransactionsForMonthDto

        const transactionsForMonth = {
            incomes: incomesRes,
            expenses: expensesRes,
            receives: receivesRes
        } as TransactionsForMonthDto

        setTransactionsForMonth(transactionsForMonth)
    }

    async function LoadInfoInitial(): Promise<dataInitial> {
        const findAllMoney = await new ReceiveMoneyService().findAllMoney();
        const findAllIncome = await new IncomeService().findAllIncome();
        const findAllExpense = await new ExpenseService().findAllExpense();

        const year = new Date().getFullYear()
        const monthNumber = new Date().getMonth() + 1

        let incomesRes = await new IncomeService().findIncomeForMonth(monthNumber, year) as IncomeTransactionsForMonthDto
        let expensesRes = await new ExpenseService().findExpenseForMonth(monthNumber, year) as ExpenseTransactionsForMonthDto
        let receivesRes = await new ReceiveMoneyService().findMoneyForMonth(monthNumber, year) as ReceiveMoneyTransactionsForMonthDto

        const transactionsForMonth = {
            incomes: incomesRes,
            expenses: expensesRes,
            receives: receivesRes
        } as TransactionsForMonthDto

        setTransactionsForMonth(transactionsForMonth)

        const month = new DateSelectService().covertMonthNumberInText(monthNumber);

        setMonth(month)
        setYear(year)
        
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

            if(incoemeRes == "received success!") {
                onClose()
                refetch()
            }

            return            
        }

        const expenseData = {
            amount: amount,
            description: describe
        } as Expense

        const expenseRes = await new ExpenseService().expenseMoney(expenseData)

        if(expenseRes == "expense success!") {
            onClose()
            refetch()
        }
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
                            navigate('/calculator')
                        }}><FaCalculator size={30} color="#29BF12"/></Button>

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

            <HeaderComponent isAuthenticated/>

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
                        {selectTypeMonth == "em mãos" && <h4>R$ {formatMoney.formatMoney(Number(transactionsForMonth?.receives?.amountFull))}</h4>}
                        {selectTypeMonth == "ganhos" && <h4>R$ {formatMoney.formatMoney(Number(transactionsForMonth?.incomes?.amountFull))}</h4>}
                        {selectTypeMonth == "despesas" && <h4>R$ {formatMoney.formatMoney(Number(transactionsForMonth?.expenses?.amountFull))}</h4>}
                    </div>
                </section>

                <ul className={style.listHistory}>
                    {selectTypeMonth == "em mãos" && transactionsForMonth?.receives?.listReceiveTransaction.map(item => <Card amount={Number(item.balance)} date={item.date || ""} description={""} type={selectTypeMonth}/>)}
                    {selectTypeMonth == "despesas" && transactionsForMonth?.expenses?.listExpenseTransaction.map(item => <Card amount={Number(item.amount)} date={item.date || ""} description={item.description || ""} type={selectTypeMonth} isNegative/>)}
                    {selectTypeMonth == "ganhos" && transactionsForMonth?.incomes?.listIncomeTransaction.map(item => <Card amount={Number(item.amount)} date={item.date || ""} description={item.description || ""} type={selectTypeMonth}/>)}
                </ul>
            </article>

            <br />

            <FooterComponent/>
            
        </div>
    )
}