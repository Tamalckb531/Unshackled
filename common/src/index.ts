import { z } from 'zod';

//? Zod Schema
const BaseAuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
});

export const SignUpSchema = BaseAuthSchema.extend({
    firstName: z.string().min(3).max(10),
    lastName: z.string().min(3).max(10),
});


export const LoginSchema = BaseAuthSchema;

//? Type
export type SignUpBodyTypes = z.infer<typeof SignUpSchema>
export type LoginBodyTypes = Pick<SignUpBodyTypes, 'email' | 'password'>;