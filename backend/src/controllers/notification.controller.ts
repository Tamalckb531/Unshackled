import { NextFunction, Request, Response } from 'express';
import {  Notification } from "@prisma/client";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    try {
        const notifications: Notification[] | null = await prisma.notification.findMany({
            where: {
                receiverId: userId,
            },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json(notifications);
    } catch (error: any) {
        next(error);
    }
}

export const getUnCheckedCount = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    try {
        const uncheckedCount: number = await prisma.notification.count({
            where: {
                receiverId: userId,
                isChecked: false,
            }
        });
        return res.status(200).json(uncheckedCount);
    } catch (error: any) {
        next(error);
    }
}

export const setCheckNotifications = async (req: Request, res: Response, next: NextFunction) => { 
    const userId = req.user?.id;

    try {
        await prisma.notification.updateMany({
            where: {
                receiverId: userId,
                isChecked: false,
            },
            data: {
                isChecked: true
            }
        });

        res.status(201).json({ msg: "Set all unChecked notification to checked successfully" });
    } catch (error: any) {
        next(error);
    }
}