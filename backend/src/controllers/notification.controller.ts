import { NextFunction, Request, Response } from 'express';
import {  Notification } from "@prisma/client";
import { PrismaClient } from '@prisma/client'
import { createNotificationType } from '@tamaldip/common';


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

export const createNotification = async (req: Request, res: Response, next: NextFunction) => { 
    const { sender,senderImg,newsId,topic}: createNotificationType = req.body;
    const { receiverId } = req.params;

    try {
        const userExists = await prisma.user.findUnique({
            where: { id: receiverId },
        });

        if (!userExists) {
            return res.status(400).json({ msg: "Receiver user does not exist." });
        }
        const data: any = {
            sender,
            senderImg,
            isChecked: false,
            newsId,
            topic,
            receiverId:receiverId
        };

        await prisma.notification.create({ data });

        res.status(200).json({ msg: "notification created successfully" });
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