import style from './style.module.css'
import HeaderComponent from '../../components/header/HeaderComponent'
import Card from './components/Card'
import { useState } from 'react';
import InputLabel from '../../components/Input/InputLabel';
import Button from '../../components/button/Button';
import Range from '../../components/range/Range';
import { IoMdArrowRoundBack } from "react-icons/io";
import { CalculatorService } from '../../service/CalculatorService';
import { FormatMoneyService } from '../../service/FormatMoneyService';

export default function CalculatorPage() {
    
    const [page, setPage] = useState<number>(0);
    const [time, setTime] = useState<number>(1);

    const [valueFull, setValueFull] = useState<number>(0);
    const [valueMonth, setValueMonth] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);

    const [objective, setObjective] = useState<number>(10000);

    const [finalMoney, setFinalMoney] = useState<Record<string, number>>({});
    const [finalMoneyMonth, setFinalMoneyMonth] = useState<number>(0);
    const [finalTime, setFinalTime] = useState<number>(0);

    const formatMoney = new FormatMoneyService();

    async function handleSubmitFinalMoney(e: any) {
        e.preventDefault();

        if(valueMonth == 0 && valueFull !== 0) {
            const res = await new CalculatorService().finalMoney({
                money: valueFull,
                interestRate: tax,
                time: time
            });

            setFinalMoney(res as Record<string, number>);
        } else {
            const res = await new CalculatorService().finalMoneyMonth({
                firstMoney: valueFull || 0,
                money: valueMonth,
                interestRate: tax,
                time: time
            });

            setFinalMoney(res as Record<string, number>);
        }
        setPage(4);

    }

    async function handleSubmitMonthlyContribution(e: any) {
        e.preventDefault();

        const res = await new CalculatorService().monthlyContribution({
            valueFuture: objective,
            interestRate: tax,
            time: time
        });

        setFinalMoneyMonth(res as number);
    }

    async function handleSubmitTime(e: any) {
        e.preventDefault();

        const res = await new CalculatorService().timeInvistment({
            valueFuture: objective,
            interestRate: tax,
            moneyMonth: valueMonth
        });

        setFinalTime(res as number);
    }

    return (
        <>
            <HeaderComponent/>
            <div className={style.container}>

                {page === 0 && (
                    <>
                        <h1>Que tipo de investimento deseja fazer? </h1>
                        <article className={style.cardContainer}>
                            <Card title="Investimento mensal" description="Vaja quanto lhe rende investindo mensalmente determinado valor por determinado tempo" onClick={() => setPage(1)}/>
                            <Card title="Saber quanto investir" description="Veja quando deve ser investido em determinado tempo para chegar no seu objetivo" onClick={() => setPage(2)}/>
                            <Card title="Tempo de investimento" description="Veja quanto tempo leva até chegar no seu objetivo investindo determinado valor" onClick={() => setPage(3)}/>
                        </article>
                    </>
                )}

                {page === 1 && (
                    <>
                        <div className={style.header}>
                            <IoMdArrowRoundBack onClick={() => setPage(0)} size={30}/>
                            <h1>Investimento mensal</h1>
                        </div>

                        <form className={style.form} onSubmit={handleSubmitFinalMoney}>
                            <InputLabel labeText="Valor investido" pleaceholder="R$ 1000" value={valueFull.toString()} onChange={(e) => {setValueFull(e.target.value)}}/>
                            <InputLabel labeText="Valor investido mensalmente" pleaceholder="R$ 100" value={valueMonth.toString()} type="number" onChange={(e) => {setValueMonth(e.target.value)}}/>
                            <InputLabel labeText="Taxa juros" pleaceholder="12%" value={tax.toString()} type="number" required onChange={(e) => {setTax(e.target.value)}}/>
                            <Range label="Tempo de investimento" value={time} onChange={(e) => {setTime(e.target.value)}} min={1} max={120} step={1}/>
                            <Button style={{width: '100%'}}>Simular</Button>
                        </form>
                    </>
                )}

                {page === 2 && (
                    <>
                        
                        <div className={style.header}>
                            <IoMdArrowRoundBack onClick={() => setPage(0)} size={30}/>
                            <h1>Saber quanto investir</h1>
                        </div>

                        <form className={style.form} onSubmit={handleSubmitMonthlyContribution}>
                            <InputLabel labeText="Objetivo" pleaceholder="R$ 10000" value={objective.toString()} type="number" required onChange={() => {}}/>
                            <InputLabel labeText="Taxa juros" pleaceholder="12%" value={tax.toString()} type="number" required onChange={(e) => {setTax(e.target.value)}}/>
                            <Range label="Tempo de investimento" value={time} onChange={(e) => {setTime(e.target.value)}} min={1} max={120} step={1}/>
                            <Button style={{width: '100%'}}>Simular</Button>
                        </form>

                        <div>
                            {(finalMoneyMonth != 0) && <h2>Será necessario um investimento de: R$ {formatMoney.formatMoney(Number(finalMoneyMonth))}</h2>}
                        </div>
                    </>
                )}

                {page === 3 && (
                    <>
                        <div className={style.header}>
                            <IoMdArrowRoundBack onClick={() => setPage(0)} size={30}/>
                            <h1>Tempo de investimento</h1>
                        </div>

                        <form className={style.form} onSubmit={handleSubmitTime}>
                            <InputLabel labeText="Objetivo" pleaceholder="R$ 10000" value={objective.toString()} type="number" required onChange={(e) => {setObjective(e.target.value)}}/>
                            <InputLabel labeText="INvestimento mensal" pleaceholder="R$ 10000" value={valueMonth.toString()} type="number" required onChange={(e) => {setValueMonth(e.target.value)}}/>
                            <InputLabel labeText="Taxa juros" pleaceholder="12%" value={tax.toString()} type="number" required onChange={(e) => {setTax(e.target.value)}}/>
                            <Button style={{width: '100%'}}>Simular</Button>
                        </form>

                        {(finalTime != 0) && <h2>Levara {finalTime} meses para chegar ao seu objetivo</h2>}
                    </>
                )}

                {page === 4 && (
                    <>
                        <section className={style.resultLabel}>
                            <IoMdArrowRoundBack onClick={() => setPage(0)} size={30} color='#444444' cursor={'pointer'}/>
                            <h2>Investimento</h2>
                        </section>
                        <article className={style.resultInvistment}>
                            <section>
                                <p>Valor investido:</p>
                                <span>R$ {formatMoney.formatMoney(Number(valueFull))}</span>
                            </section>
                            <section>
                                <p>Investido mensal:</p>
                                <span>R$ {formatMoney.formatMoney(Number(valueMonth))}</span>
                            </section>
                            <section>
                                <p>Tempo:</p>
                                <span>{time} meses</span>
                            </section>
                            <section>
                                <p>Taxa de juros:</p>
                                <span>{tax} %</span>
                            </section>
                        </article>
                        <section className={style.resultLabel}>
                            <h2>Resultado</h2>
                        </section>
                        <article className={style.resultInvistment}>
                            <section>
                                <p>Valor investido</p>
                                <span>R$ {formatMoney.formatMoney(Number(finalMoney?.invistedFull))}</span>
                            </section>
                            <section>
                                <p>Valor bruto</p>
                                <span>R$ {formatMoney.formatMoney(Number(finalMoney?.valueBrute))}</span>
                            </section>
                            <section>
                                <p>Valor real</p>
                                <span>R$ {formatMoney.formatMoney(Number(finalMoney?.finalMoney))}</span>
                            </section>
                            <section>
                                <p>Lucro</p>
                                <span>R$ {formatMoney.formatMoney(Number(finalMoney?.profit))}</span>
                            </section>
                        </article>
                    
                    </>
                )}
                
            </div>
        </>
    )
}