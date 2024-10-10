import { Request, Response } from "express";
import { IncomeService } from "../service/IncomeService";

export class incomeController {
    async incomeMoney(req: Request | any, res: Response) {
        const incomeRes = await new IncomeService().income(req.body, req.user_id);

        res.json(incomeRes);
    }

    async findAllIncome(req: Request | any, res: Response) {
        const incomeRes = await new IncomeService().findAllIncome(req.user_id);

        res.json(incomeRes);
    }

    async findIncomeForMonth(req: Request | any, res: Response) {

        const { month, year } = req.params;

        const incomeRes = await new IncomeService().findIncomeForMonth(req.user_id, month, year);

        res.json(incomeRes);

    }
}