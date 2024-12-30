import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

const getUserMid = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    

    if (token) {
        const secretKey = process.env.JWT_SECRET_KEY;

        if (!secretKey) return next(new Error('Secret key not defined'));

        jwt.verify(token, secretKey, (err: any, decode: any) => {
            if (err) return next(new Error('Unauthorized'));
            req.user = decode as JwtPayload;
            return next();
        });
    } else {
        req.user = undefined;
        next();
    }
}

export default getUserMid;