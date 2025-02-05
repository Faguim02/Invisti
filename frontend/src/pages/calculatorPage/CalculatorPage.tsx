import style from './style.module.css'
import HeaderComponent from '../../components/header/HeaderComponent'
import Card from './components/Card'
import { useState } from 'react';
import InputLabel from '../../components/Input/InputLabel';
import Button from '../../components/button/Button';
import Range from '../../components/range/Range';
import { IoMdArrowRoundBack } from "react-icons/io";
import { CalculatorService } from '../../service/CalculatorService';

export default function CalculatorPage() {
    
    const [page, setPage] = useState<number>(0);
    const [time, setTime] = useState<number>(1);

    const [valueFull, setValueFull] = useState<number>(0);
    const [valueMonth, setValueMonth] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);

    const [finalValue, setFinalValue] = useState<number>(0);
    const [finalTime, setFinalTime] = useState<number>(0);
    const [finalMonth, setFinalMonth] = useState<number>(0);

    const [finalValueMonth, setFinalValueMonth] = useState<number>(0);

    async function handleSubmitFinalMoney(e: any) {
        e.preventDefault();

        if(valueMonth == 0 && valueFull !== 0) {
            const res = await new CalculatorService().finalMoney({
                money: valueFull,
                interestRate: tax,
                time: time
            });

            console.log(res);
        } else {
            const res = await new CalculatorService().finalMoneyMonth({
                money: Number(valueMonth + valueFull),
                interestRate: tax,
                time: time
            });

            console.log(res);
        }

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

                        <form className={style.form}>
                            <InputLabel labeText="Objetivo" pleaceholder="R$ 10000" value="" type="number" required onChange={() => {}}/>
                            <InputLabel labeText="Taxa juros" pleaceholder="12%" value="" type="number" required onChange={() => {}}/>
                            <Range label="Tempo de investimento" value={time} onChange={(e) => {setTime(e.target.value)}} min={1} max={120} step={1}/>
                            <Button style={{width: '100%'}}>Simular</Button>
                        </form>
                    </>
                )}

                {page === 3 && (
                    <>
                        <div className={style.header}>
                            <IoMdArrowRoundBack onClick={() => setPage(0)} size={30}/>
                            <h1>Tempo de investimento</h1>
                        </div>

                        <form className={style.form}>
                            <InputLabel labeText="Objetivo" pleaceholder="R$ 10000" value="" type="number" required onChange={() => {}}/>
                            <InputLabel labeText="INvestimento mensal" pleaceholder="R$ 10000" value="" type="number" required onChange={() => {}}/>
                            <InputLabel labeText="Taxa juros" pleaceholder="12%" value="" type="number" required onChange={() => {}}/>
                            <Button style={{width: '100%'}}>Simular</Button>
                        </form>
                    </>
                )}
                
            </div>
        </>
    )
}