import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

async function isAuthentication(req: any, res: Response, next: NextFunction) {


    
    const authToken = req.headers.authorization as string;

    if(!authToken) {
        res.status(401).end();
    }

    const [, token] = authToken?.split(" ");

    const jwtSecret = process.env.SECRET_JWT as string

    try {
        const {sub} = verify(
            token,
            jwtSecret
        );

        req.user_id = sub;
        
        return next();
    } catch (error) {
        res.status(401).end();
    }
}