import { Router } from "express";
import { UserController } from "./controller/UserController";

export const router = Router();

router.post('/signUp', new UserController().signUp);