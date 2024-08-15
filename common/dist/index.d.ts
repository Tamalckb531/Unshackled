import { z } from 'zod';
export declare const SignUpSchema: z.ZodObject<z.objectUtil.extendShape<{
    email: z.ZodString;
    password: z.ZodString;
}, {
    firstName: z.ZodString;
    lastName: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}>;
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SignUpBodyTypes = z.infer<typeof SignUpSchema>;
export type LoginBodyTypes = Pick<SignUpBodyTypes, 'email' | 'password'>;
