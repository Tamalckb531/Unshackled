import { News} from "@prisma/client";
import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express';


const prisma = new PrismaClient();

export const getNews = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const startIndex = parseInt(req.query.startIndex as string) || 0;
        const limit = parseInt(req.query.limit as string) || 9;
        const filter = req.query.filter as string || 'new';
        const searchTerm = req.query.searchTerm as string;
        const flare = req.query.flare as string;
        const newsId = req.query.newsId as string;

        //? finding logic 
        let whereClaus: any = {}

        if (flare) whereClaus.flare = flare;
        if (newsId) whereClaus.id = newsId;

        if (searchTerm) {
            whereClaus.OR = [
                { title: { contains: searchTerm, mode: 'insensitive' } },
                { content: { contains: searchTerm, mode: 'insensitive' } }
            ]
        }

        //? Sorting logic
        let orderByClause: any = {};

        switch (filter) {
            case 'new':
                orderByClause = { postingTime: 'desc' };
                break;
            case 'old':
                orderByClause = { postingTime: 'asc' };
                break;
            case 'popular':
                orderByClause = { upvotes: 'desc' };
                break;
            default:
                orderByClause = { postingTime: 'desc' };
                break;
        }

        //? Fetch post of all kind
        const news: News[] | null = await prisma.news.findMany({
            where: whereClaus,
            orderBy: orderByClause,
            skip: startIndex,
            take: limit,
            include: {
                author: {
                    select: {
                        firstName: true,
                        lastName: true,
                        userName: true,
                        photoURL: true,
                    }
                },
                comments: {
                    select: {
                        id: true,    
                        content: true,
                        author: true,
                    }
                },
                _count: {
                    select: {
                        comments: true,
                    }
                }
            }
        });

        res.status(200).json({ news });
        
    } catch (error: any) {
        next(error);
    }
} 

export const getFlare = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const flares = await prisma.news.findMany({
            select: {
                flare: true,
            },
            distinct: ['flare']
        });

        const flareList = flares.map(f => f.flare);

        res.status(200).json({ flares: flareList });

    } catch (error: any) {
        next(error);   
    }
}