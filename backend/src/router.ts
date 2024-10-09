import { Router } from "express";
import { UserController } from "./controller/UserController";
import { ReceiveMoneyController } from "./controller/ReceiveMoneyController";
import { isAuthentication } from "./middlewares/isAuthentication";

export const router = Router();

router.post('/signUp', new UserController().signUp);
router.post('/signIn', new UserController().signIn);

router.post('/money', isAuthentication, new ReceiveMoneyController().insertFirstMoney);