import { PrismaClient } from '@prisma/client'
import { CommentBodyTypes, CommentSchema } from "@tamaldip/common";
import { NextFunction, Request, Response } from 'express';
import { z } from "zod";

const prisma = new PrismaClient();


export const postComment = async (req: Request, res: Response, next: NextFunction) => {
    const { newsId } = req.params;
    const userId = req.user?.id || "";
    const { content, parentId }: CommentBodyTypes = req.body;
    
    try {
        CommentSchema.parse({ content, parentId });
        const commentData: any = {
            content,
            newsId,
            authorId: userId,
            parentId: null
        };
        if (parentId) {
            const parentComment = await prisma.comment.findUnique({
                where: { id: parentId }
            });
            
            if (!parentComment) {
                return res.status(404).json({ msg: "Parent comment not found" });
            }

            commentData.parentId = parentComment.id;
        }
        const newComment = await prisma.comment.create({
            data: commentData,
        });

        const newCommentWithDetails = await prisma.comment.findUnique({
            where: { id: newComment.id },
            include: {
                author: {
                    select: {
                        id:true,
                        firstName: true,
                        lastName: true,
                        userName: true,
                        photoURL: true,
                    },
                },
                replies: {
                    select: {
                        id: true,
                        content: true,
                        upvotes: true,
                        downvotes: true,
                        timePosted: true,
                        parentId: true,
                        author: {
                            select: {
                                id:true,
                                firstName: true,
                                lastName: true,
                                userName: true,
                                photoURL: true,
                            },
                        },
                        parent: {
                            select: {
                                id:true,
                            }
                        }
                    },
                },
                parent: {
                    select: {
                        id:true,
                    }
                }
            },
        });

        res.status(200).json({
            msg: "Comment successful",
            comment: newCommentWithDetails,
        });
    } catch (error: any) {

        if (error instanceof z.ZodError) {
            return res.status(400).json({ msg: "Invalid input data", error: error.errors });
        }

        next(error);
    }
}