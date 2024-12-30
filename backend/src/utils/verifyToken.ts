import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
import errorHandler from "./error";

interface JwtPayload{
    id: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;  // Attach user to Request type
        }
    }
}


const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    // console.log(req.cookies);
    // console.log(req.headers.cookies);
    
    const token = req.cookies.access_token; 
    if (!token) {
        return next(errorHandler(401, "Unauthorized"));
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) return next(errorHandler(500, "Internal server error || The secret key is not defined"));

    jwt.verify(token, secretKey, (err:any, decoded:any) => {
        if (err) return next(errorHandler(401, "Unauthorized"));
        req.user = decoded as JwtPayload;
        next();
    })
}

export default verifyToken;