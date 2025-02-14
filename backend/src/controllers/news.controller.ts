import {  News, Prisma, User} from "@prisma/client";
import { PrismaClient } from '@prisma/client'
import { CreateNewsTypes, NewsSchema, userForCollaboration } from "@tamaldip/common";
import { NextFunction, Request, Response } from 'express';
import { z } from "zod";

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

export const getNewsById = async (req: Request, res: Response, next: NextFunction)=>{
    const { newsId } = req.params;
    const userId = req.user?.id ;
    try {        

        const news = await prisma.news.findUnique({
            where: { id: newsId },
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        userName: true,
                        bio: true,
                        email: true,
                        photoURL: true,
                    }
                },
                collaborators: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        photoURL:true
                  }  
                },
                comments: {
                    select: {
                        id: true,
                        content: true,
                        upvotes: true,
                        downvotes: true,
                        timePosted: true,
                        author: {
                            select: {
                                id:true,
                                firstName: true,
                                lastName: true,
                                userName: true,
                                photoURL: true,
                            }
                        },
                        replies: {
                            select: {
                                id: true,
                                content: true,
                                upvotes: true,
                                downvotes: true,
                                timePosted: true,
                                author: {
                                    select: {
                                        id:true,
                                        firstName: true,
                                        lastName: true,
                                        userName: true,
                                        photoURL: true,
                                    }
                                },
                                parent: {
                                    select: {
                                        id:true
                                    }
                                }
                            }
                        },
                        parent: {
                            select: {
                                id: true,
                            }
                        },
                        ...(userId && {
                            upvotedBy: {
                                where: { id: userId },
                                select: { id: true }
                            },
                            downvotedBy: {
                                where: { id: userId },
                                select: { id: true }
                            },
                        })
                    }
                },
                ...(userId && {
                    upvotedBy: {
                        where: { id: userId },
                        select: { id: true }
                    },
                    downvotedBy: {
                        where: { id: userId },
                        select: { id: true }
                    },
                    bookmarkedBy: {
                        where: { id: userId },
                        select: { id: true }
                    }
                })
            }
        });   

        if (!news) return res.status(404).json({ msg: "News not exist" });

        res.status(200).json(news);
    } catch (error: any) {
        next(error);
    }
} 

//? create the news -> increment newCount for user -> increment collaborationCount for collaborators
export const createNews = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, flare, posterImage, is_Author_Anonymous,collaborators }: CreateNewsTypes = req.body;
    const userId = req.user?.id;

    try {
        NewsSchema.parse({ title, content, posterImage, flare, is_Author_Anonymous,collaborators });

        const data:any = {
            title,
            content,
            flare,
            posterImage,
            is_Author_Anonymous,
            authorId: userId,
            collaborators: {
                connect: collaborators?.map((collaborator) => ({ id: collaborator.id })) || []
            }
        };
        
        const newNews:News = await prisma.news.create({
            data,
        });

        await prisma.user.update({
            where: { id: userId },
            data: {
                newsCount: {
                    increment: 1
                }
            }
        });

        if (collaborators && collaborators.length > 0) {
            await prisma.user.updateMany({
                where: {
                    id:{in:collaborators.map((collaborator)=>collaborator.id)}
                },
                data: {
                    collaborationCount:{increment:1}
                }
            })
        }

        res.status(201).json({
            msg: "News created successfully",
            newsId: newNews.id
        });
        
    } catch (error: any) {
        
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }

        if (error.code === 'P2002') {
            return res.status(409).json({ error: "Duplicate entry" });
        }
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

export const upvoteNews = async (req: Request, res: Response, next: NextFunction) => { 
    const { newsId } = req.params;
    const userId = req.user?.id;
    try {
        const news = await prisma.news.findUnique({
            where: { id: newsId },
        });

        if (!news) return res.status(404).json({ msg: "News not found" });

        //? already Upvote 
        const alreadyUpvoted = await prisma.news.findUnique({
            where: { id: newsId },
            select: {
                upvotedBy: {
                    where: { id: userId },
                }
            }
        });

        if (alreadyUpvoted && alreadyUpvoted.upvotedBy.length > 0) {
            await prisma.news.update({
                where: { id: newsId },
                data: {
                    upvotes: {
                        decrement: 1
                    },
                    upvotedBy: {
                        disconnect: {
                            id: userId,
                        }
                    }
                }
            });

            return res.status(200).json({ msg: "Upvote removed successfully" });
        } else {
            await prisma.news.update({
                where: { id: newsId },
                data: {
                    upvotes: {
                        increment: 1,
                    },
                    upvotedBy: {
                        connect: {
                            id: userId,
                        }
                    }
                }
            });

            return res.status(200).json({ msg: "News upvoted successfully" });
        }

    } catch (error: any) {
        next(error);   
    }
}

export const downvoteNews = async (req: Request, res: Response, next: NextFunction) => {
    const { newsId } = req.params;
    const userId = req.user?.id;
    try {
        const news = await  prisma.news.findUnique({
            where: { id: newsId }
        });

        if (!news) return res.status(404).json({ msg: "News not found" });

        const alreadyDownVoted = await prisma.news.findUnique({
            where: { id: newsId },
            select: {
                downvotedBy: {
                    where: { id: userId }
                }
            }
        });

        if (alreadyDownVoted && alreadyDownVoted.downvotedBy.length > 0) {
            await prisma.news.update({
                where: { id: newsId },
                data: {
                    downvotes: {
                        decrement: 1,
                    },
                    downvotedBy: {
                        disconnect: {
                            id: userId,
                        }
                    }
                }
            });

            return res.status(200).json({ msg: "Downvote removed successfully" });
        } else {
            await prisma.news.update({
                where: { id: newsId },
                data: {
                    downvotes: {
                        increment: 1,
                    },
                    downvotedBy: {
                        connect: {
                            id: userId,
                        }
                    },
                }
            });

            return res.status(200).json({ msg: "News downvoted successfully" });
        }
    } catch (error: any) {
        next(error);
    }
}

export const bookmarkedNews = async (req: Request, res: Response, next: NextFunction) => {
    const { newsId } = req.params;
    const userId = req.user?.id;

    try {
        const news = await prisma.news.findUnique({
            where: { id: newsId }
        });

        if (!news) return res.status(404).json({ msg: "News not found" });

        const alreadyBookmarked = await prisma.news.findUnique({
            where: { id: newsId },
            select: {
                bookmarkedBy: {
                    where: { id: userId }
                }
            }
        });

        if (alreadyBookmarked && alreadyBookmarked.bookmarkedBy.length > 0) {
            await prisma.news.update({
                where: { id: newsId },
                data: {
                    bookmarkCount: {
                        decrement: 1,
                    },
                    bookmarkedBy: {
                        disconnect: {
                            id: userId,
                        }
                    }
                }
            });

            return res.status(200).json({ msg: "Bookmark removed successfully" });
        } else {
            await prisma.news.update({
                where: { id: newsId },
                data: {
                    bookmarkCount: {
                        increment: 1,
                    },
                    bookmarkedBy: {
                        connect: {
                            id: userId,
                        }
                    }
                }
            });

            return res.status(200).json({ msg: "News bookmarked successfully" });
        }
    } catch (error: any) {
        next(error);
    }
}

export const getUserForCollaboration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchTerm = req.query.searchTerm as string;

        const users: userForCollaboration[] | null = await prisma.user.findMany({
            where: {
                OR: [
                   {firstName:{contains:searchTerm, mode:'insensitive'}},
                   {lastName:{contains:searchTerm, mode:'insensitive'}},
                   {email:{contains:searchTerm, mode:'insensitive'}},
                   {userName:{contains:searchTerm, mode:'insensitive'}},
               ],
           },
            select: {
                id:true,
                firstName: true,
                lastName: true,
                userName: true,
                photoURL: true
            }
        });
        res.status(200).json(users)
    } catch (err:any) {
        next(err);
    }
}

export const getUserNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, flare } = req.params;
        let news;
        //? flare cases : "featured", "allNews", "upvoted", "bookmarked", "collaboration"
        switch (flare) {
            case "featured":
                news = await prisma.news.findMany({
                    where: { featuredBy: { some: { id: userId } } },
                });
                break;
            
            case "allNews":
                news = await prisma.news.findMany({
                    where: { authorId:userId },
                });
                break;

            case "upvoted":
                news = await prisma.news.findMany({
                    where: { upvotedBy: { some: { id: userId } } },
                });
                break;

            case "bookmarked":
                news = await prisma.news.findMany({
                    where: { bookmarkedBy: { some: { id: userId } } },
                });
                break;

            case "collaboration":
                news = await prisma.news.findMany({
                    where: { collaborators: { some: { id: userId } } },
                });
                break;
            
            default:
                return res.status(400).json({ msg: "Invalid flare type" });
        }

        return res.status(200).json(news);
    } catch (error: any) {
        next(error);
    }
}