import { Prisma, User } from "@prisma/client";
import { PrismaClient } from '@prisma/client'
import {  profileEditSchema, profileEditTypes } from "@tamaldip/common";
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, userName, email, photoUrl, bio, location }: profileEditTypes = req.body;
    const userId = req.user?.id;
    try {
        profileEditSchema.parse({ firstName, lastName, userName, email, photoUrl, bio, location });

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) return res.status(404).json({ msg: "User not found" });

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                firstName: firstName ?? user.firstName,
                lastName: lastName ?? user.lastName,
                userName: userName ?? user.userName,
                email: email ?? user.email,
                bio: bio ?? user.bio,
                photoURL: photoUrl ?? user.photoURL,
                location: location ?? user.location,
            },
        });

        //? remove password
        const { password: pass, ...userWithoutPass } = updatedUser;

        return res.status(200).json(userWithoutPass);
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return res.status(400).json({ msg: "Email or username already exists" });
            }
        }
        next(error);
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) return res.status(404).json({ msg: "User not found" });
        return res.status(200).json(user);
    } catch (error: any) {
        next(error);
    }
}

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
    const { followId } = req.params;
    const userId = req.user?.id as string;

    if (userId === followId) return res.status(400).json({ msg: "You can't follow yourself" });

    try {
        const userToFollow = await prisma.user.findUnique({
            where: { id: followId },
        });

        if (!userToFollow) return res.status(404).json({ msg: "User not found" });

        //? already followed 
        const alreadyFollowed = await prisma.follow.findFirst({
            where: {
                followeeId: followId,
                followerId: userId,
            },
        });

        if (alreadyFollowed) {
            await prisma.$transaction([
                prisma.follow.deleteMany({
                    where: { followerId: userId, followeeId: followId }
                }),
                prisma.user.update({
                    where: { id: followId },
                    data: { followeeCount: { decrement: 1 } },
                }),
                prisma.user.update({
                    where: { id: userId },
                    data: { followerCount: { decrement: 1 } },
                }),
            ]);

            return res.status(200).json({ msg: "User un-followed successfully" });
        } else {
            await prisma.$transaction([
                prisma.follow.create({
                    data: {
                        followerId: userId,
                        followeeId: followId
                    },
                }),
                prisma.user.update({
                    where: { id: followId },
                    data: { followeeCount: { increment: 1 } },
                }),
                prisma.user.update({
                    where: { id: userId },
                    data: { followerCount: { increment: 1 } },
                }),
            ]);
            
            return res.status(200).json({ msg: "User followed successfully" });
        }

    } catch (error: any) {
        next(error);
    }
}

export const isFollowing = async (req: Request, res: Response, next: NextFunction) => {
    const { followId } = req.params;
    const userId = req.user?.id as string;

    if (userId === followId) return res.status(204).end();

    try {
        const following = await prisma.follow.findFirst({
            where: {
                followeeId: followId,
                followerId: userId,
            },
        });

        if (following) {
            return res.status(200).json(true);
        } else {
            return res.status(200).json(false);
        }
    }catch (error: any) {
        next(error);
    }
}

export const getFollowers = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    try {
        const followers = await prisma.follow.findMany({
            where: { followeeId: userId },
            select: {
                follower: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        userName: true,
                        photoURL: true
                    }
                }
            }
        });

        if (followers.length === 0) return res.status(204).end();

        res.status(200).json(followers);
    } catch (error: any) {
        next(error);
    }
}