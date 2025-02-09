import { User} from "@prisma/client";
import { PrismaClient } from '@prisma/client'
import { SignUpBodyTypes, SignUpSchema, LoginBodyTypes, LoginSchema } from "@tamaldip/common";
import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET_KEY||"";

export const signUpProcess = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password }: SignUpBodyTypes = req.body;

    try {
        SignUpSchema.parse({ firstName, lastName, email, password });

        //? email already exist can't create a new account
        const existingUser: User | null = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(400).json({
                msg: "Email already exists"
            })
        }

        //? user creation
        const hashedPassword: string = bcryptjs.hashSync(password, 10);

        const newUser: User = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password:hashedPassword
            }
        })

        //? Token generation with JWT adn sending as cookie

        if (!secretKey) {
            throw new Error("JWT_SECRET_KEY is not defined in the environment variables");
        }

        const token: string = jwt.sign({
            id: newUser.id
        }, secretKey)

        const { password: pass, ...userWithoutPass } = newUser;

        res.status(200).cookie('access_token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/' //? Ensure cookie is valid for all routes
        }).json({
            msg: "Sign-up Successful",
            user: userWithoutPass
        });
    } catch (error: any) {
        if (error) {
            return res.status(400).json({
                msg: "Invalid input data",
                errors: error.errors
            });
        }
        res.status(500).json({msg: error.message})
    }
    }

export const loginProcess = async(req: Request, res: Response) => {
    const { email, password }: LoginBodyTypes = req.body;
    
    try {

        //? Validation via zod
        LoginSchema.parse({ email, password });

        //? Getting the user via email
        const validUser: User | null = await prisma.user.findUnique({
            where: { email }
        });

        if (!validUser) {
            return res.status(404).json({
                msg: "Email not registered"
            })
        }

        //? Password validation with bcryptJs
        const validPassword: boolean = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return res.status(404).json({
                msg: "Invalid Password"
            })
        }

        //? Token Generation with JWT and sending as cookie

        const token:string = jwt.sign(
            { id: validUser.id },
            secretKey
        )

        const { password: pass, ...userWithoutPass } = validUser;

        
        res.status(200).cookie('access_token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        }).json({
            msg: "Log-in Successful",
            user: userWithoutPass
        });

        
    } catch (error: any) {
        
        if (error) {
            return res.status(400).json({
                msg: "Invalid input data",
                errors: error.errors
            });
        }
        res.status(500).json({msg: error.message})
    }
}

export const google = async (req: Request, res: Response, next: NextFunction) => {
    //? Take the firstName, lastName and email
    type GoogleAuthBodyType = Omit<SignUpBodyTypes, 'password'>;
    const { firstName, lastName, email }: GoogleAuthBodyType = req.body;

    try {
        //? Find the user: 
        const User: User | null = await prisma.user.findUnique({
            where: { email }
        });
        
        if (User) { //? On User existence do things: 

            const token:string = jwt.sign(
                { id: User.id },
                secretKey
            )
    
            const { password: pass, ...userWithoutPass } = User;
            
            res.status(200).cookie('access_token', token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path:'/'
            }).json({
                msg: "Log-in Successful",
                user: userWithoutPass
            });
        } else { //? On User not exist do things:
            
            const generatedPassword:string =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            
            //? user creation
            const hashedPassword: string = bcryptjs.hashSync(generatedPassword, 10);

            const newUser: User = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password:hashedPassword
                }
            })

            //? Token generation with JWT adn sending as cookie

            if (!secretKey) {
                throw new Error("JWT_SECRET_KEY is not defined in the environment variables");
            }

            const token: string = jwt.sign({
                id: newUser.id
            }, secretKey)

            const { password: pass, ...userWithoutPass } = newUser;

            res.status(200).cookie('access_token', token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path:'/'
            }).json({
                msg: "Sign-up Successful",
                user: userWithoutPass
            });
            }
    } catch (error: any) {
        next(error);
    };

}