import { Router } from "express";
import { UserController } from "./controller/UserController";
import { ReceiveMoneyController } from "./controller/ReceiveMoneyController";
import { isAuthentication } from "./middlewares/isAuthentication";
import { incomeController } from "./controller/IncomeController";
import { ExpenseController } from "./controller/ExpenseController";

export const router = Router();

router.post('/signUp', new UserController().signUp);
router.post('/signIn', new UserController().signIn);

router.post('/money', isAuthentication, new ReceiveMoneyController().insertFirstMoney);
router.get('/current', isAuthentication, new ReceiveMoneyController().findAllMoney)
router.get('/current/:month/:year', isAuthentication, new ReceiveMoneyController().findMoneyForMonth)

router.post('/income', isAuthentication, new incomeController().incomeMoney);
router.get('/income', isAuthentication, new incomeController().findAllIncome);
router.get('/income/:month/:year', isAuthentication, new incomeController().findIncomeForMonth);

router.post('/expense', isAuthentication, new ExpenseController().expenseMoney);
router.get('/expense', isAuthentication, new ExpenseController().findAllExpense);
router.get('/expense/:month/:year', isAuthentication, new ExpenseController().findEXpenseForMonth);