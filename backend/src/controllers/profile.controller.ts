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