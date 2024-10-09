import { Request, Response } from "express";
import { UserService } from "../service/UserService";

export class UserController {

    async signUp(req: Request, res: Response) {
        
        const userServiceResponse = await new UserService().signUp(req.body);

        res.json(userServiceResponse);

    }

    async signIn(req: Request, res: Response) {

        const userServiceResponse = await new UserService().signIn(req.body);

        res.json(userServiceResponse);

    }

}