import { Request, Response } from "express";
import { ReceiveMoneyService } from "../service/ReceiveMoneyService";

export class ReceiveMoneyController {
    async insertFirstMoney(req: Request | any, res: Response) {
        const firstMoneyRes = await new ReceiveMoneyService().insertFirstMoney(req.body, req.user_id);

        res.json(firstMoneyRes);
    }

    async findAllMoney(req: Request | any, res: Response) {

        const moneyRes = await new ReceiveMoneyService().findAllMoney(req.user_id);

        res.json(moneyRes);
    }

    async findMoneyForMonth(req: Request | any, res: Response) {

        const { month, year } = req.params;

        const moneyRes = await new ReceiveMoneyService().findMoneyForMonth(req.user_id, month, year);

        res.json(moneyRes);
    }
}