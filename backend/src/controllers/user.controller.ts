import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

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

export const getCount = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    try {
        const userCount = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                newsCount: true,
                collaborationCount: true,
                followeeCount: true,
                followerCount: true,
            }
        });

        if (!userCount) return res.status(404).json({ msg: "User not exist" });

        res.status(200).json(userCount);
    } catch (error: any) {
        next(error);
    }
}