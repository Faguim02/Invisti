import { Request, Response } from "express";
import { ExpenseService } from "../service/ExpenseService";

export class ExpenseController {
    async expenseMoney(req: Request | any, res: Response) {
        const expenseRes = await new ExpenseService().expenseMoney(req.body, req.user_id);

        res.json(expenseRes);
    }

    async findAllExpense(req: Request | any, res: Response) {
        const expenseRes = await new ExpenseService().findAllExpense(req.user_id);

        res.json(expenseRes);
    }

    async findEXpenseForMonth(req: Request | any, res: Response) {
        const {month, year} = req.params;
        const expenseRes = await new ExpenseService().findExpenseForMonth(req.user_id, month, year)

        res.json(expenseRes);
    }
}