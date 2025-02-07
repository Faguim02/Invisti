import { CDI } from "../data/Dtos";

export default class FinancialCalculatorService {

    private typesInvist = {
        1: "pós-fixado",
        2: "pré-fixado",
        3: "ipca"
    }

    public calculateTimeInvested(valueFuture: number, moneyMonth: number, interestRate: number) {
        interestRate = (interestRate / 100) / 12;

        const valueBrute = valueFuture;

        const time = Math.log((valueBrute * interestRate / moneyMonth) + 1) / Math.log(1 + interestRate);

        return Math.ceil(time);
    }

    public calculateMonthlyContribution(valueFuture: number, interestRate: number, time: number): number {
        interestRate = (interestRate / 100) / 12;

        const valorBruto = valueFuture + this.calculeIR(time, valueFuture);

        const monthlyContribution: number = (valorBruto * interestRate) / (Math.pow(1 + interestRate, time) - 1);

        return Number(monthlyContribution.toFixed(2));
    }

    public simulateFinalMoney(money: number, interestRate: number, time: number): Record<string, number> {
        
        const finalMoneyBrute: number = money * Math.pow(1 + (interestRate / 100), (time / 12));
        const finalMoney = finalMoneyBrute - this.calculeIR(time, finalMoneyBrute - money);
        
        return {
            finalMoney: finalMoney,
            valueBrute: finalMoneyBrute,
            invistedFull: money,
            profit: finalMoney - money
        };
    }

    public simuleFinalMoneyForMonth(firstMoney: number, money: number, interestRate: number, time: number): Record<string, number> {
        interestRate = (interestRate / 100) / 12;

        let valueBrute = money * ((Math.pow(1 + interestRate, time) - 1) / interestRate) * (1 + interestRate);

        let invistedFull = time * money;

        let finalMoney = valueBrute - this.calculeIR(time, valueBrute - invistedFull);

        let profit = finalMoney - invistedFull;

        if(firstMoney !== null || firstMoney !== undefined || firstMoney !== 0) {
            finalMoney += Number(this.simulateFinalMoney(firstMoney, interestRate, time).finalMoney);
            valueBrute += Number(this.simulateFinalMoney(firstMoney, interestRate, time).valueBrute);
            invistedFull += Number(firstMoney);
            profit += Number(this.simulateFinalMoney(firstMoney, interestRate, time).profit);
        }
        
        return {
            finalMoney: finalMoney,
            valueBrute: valueBrute,
            invistedFull: invistedFull,
            profit: profit
        };
    }

    private calculeIR(time: number, profit: number): number {
        if(time <= 6) {
            return 0.225 * profit;
        } else if(time > 6 && time <= 12) {
            return 0.2 * profit;
        } else if(time > 12 && time <= 24) {
            return 0.175 * profit;
        } else {
            return 0.15 * profit;
        }
    }

}