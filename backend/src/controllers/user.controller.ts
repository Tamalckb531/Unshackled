import { NextFunction, Request, Response } from "express";

export const signout = (req:Request, res:Response, next:NextFunction) => {
    try {
        res
            .clearCookie('access_token')
            .status(200)
            .json("User has been signed out")
    } catch (error) {
        next(error);
    }
}