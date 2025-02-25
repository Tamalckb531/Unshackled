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

export const getCheckedCount = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    try {
        const checkedCount: number = await prisma.notification.count({
            where: {
                receiverId: userId,
                isChecked: false,
            }
        });
        return res.status(200).json(checkedCount);
    } catch (error: any) {
        next(error);
    }
}