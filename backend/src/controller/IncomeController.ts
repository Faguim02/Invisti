import { Request, Response } from "express";
import { IncomeService } from "../service/IncomeService";

export class incomeController {
    async incomeMoney(req: Request | any, res: Response) {
        const incomeRes = await new IncomeService().income(req.body, req.user_id);

        res.json(incomeRes);
    }
}