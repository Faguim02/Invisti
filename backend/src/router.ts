import { Router } from "express";
import { UserController } from "./controller/UserController";
import { ReceiveMoneyController } from "./controller/ReceiveMoneyController";
import { isAuthentication } from "./middlewares/isAuthentication";
import { incomeController } from "./controller/IncomeController";

export const router = Router();

router.post('/signUp', new UserController().signUp);
router.post('/signIn', new UserController().signIn);

router.post('/money', isAuthentication, new ReceiveMoneyController().insertFirstMoney);
router.get('/current', isAuthentication, new ReceiveMoneyController().findAllMoney)
router.get('/current/:month/:year', isAuthentication, new ReceiveMoneyController().findMoneyForMonth)

router.post('/income', isAuthentication, new incomeController().incomeMoney);