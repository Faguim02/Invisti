import { Request, Response } from "express";
import FinancialCalculatorService from "../service/financialCalculatorService";

export class FinancialCalculatorController {
    async calculateMonthlyContribution(req: Request, res: Response) {
        const { valueFuture, interestRate, time } = req.body;

        const financialCalculatorServiceResponse = await new FinancialCalculatorService().calculateMonthlyContribution(
            valueFuture,
            interestRate,
            time
        );

        res.json(financialCalculatorServiceResponse);
    }

    async calculateTimeInvested(req: Request, res: Response) {
        const { valueFuture, moneyMonth, interestRate } = req.body;

        const financialCalculatorServiceResponse = await new FinancialCalculatorService().calculateTimeInvested(
            valueFuture,
            moneyMonth,
            interestRate
        );

        res.json(financialCalculatorServiceResponse);
    }

    async simulateFinalMoney(req: Request, res: Response) {
        const { money, interestRate, time } = req.body;

        const financialCalculatorServiceResponse = await new FinancialCalculatorService().simulateFinalMoney(
            money,
            interestRate,
            time
        );

        res.json(financialCalculatorServiceResponse);
    }
}
