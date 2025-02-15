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
export declare const CommentSchema: z.ZodObject<{
    content: z.ZodString;
    parentId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    content: string;
    parentId?: string | undefined;
}, {
    content: string;
    parentId?: string | undefined;
}>;
export declare const NewsSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    posterImage: z.ZodOptional<z.ZodString>;
    flare: z.ZodString;
    is_Author_Anonymous: z.ZodOptional<z.ZodBoolean>;
    collaborators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        photoURL: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        id: string;
        photoURL?: string | undefined;
    }, {
        firstName: string;
        lastName: string;
        id: string;
        photoURL?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    content: string;
    title: string;
    flare: string;
    posterImage?: string | undefined;
    is_Author_Anonymous?: boolean | undefined;
    collaborators?: {
        firstName: string;
        lastName: string;
        id: string;
        photoURL?: string | undefined;
    }[] | undefined;
}, {
    content: string;
    title: string;
    flare: string;
    posterImage?: string | undefined;
    is_Author_Anonymous?: boolean | undefined;
    collaborators?: {
        firstName: string;
        lastName: string;
        id: string;
        photoURL?: string | undefined;
    }[] | undefined;
}>;
export declare const profileEditSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    userName: z.ZodString;
    bio: z.ZodOptional<z.ZodString>;
    photoUrl: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    bio?: string | undefined;
    photoUrl?: string | undefined;
    location?: string | undefined;
}, {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    bio?: string | undefined;
    photoUrl?: string | undefined;
    location?: string | undefined;
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
export type CommentBodyTypes = z.infer<typeof CommentSchema>;
export type CreateNewsTypes = z.infer<typeof NewsSchema>;
export type profileEditTypes = z.infer<typeof profileEditSchema>;
export interface NewsData {
    id: string;
    title: string;
    content: string;
    posterImage?: string;
    flare: string;
    is_Author_Anonymous: boolean;
    postingTime: string;
    upvotes: number;
    downvotes: number;
    bookmarkCount: number;
    author: {
        id: string;
        firstName: string;
        lastName: string;
        userName: string;
        bio: string;
        email: string;
        photoURL?: string;
    };
    collaborators: {
        id: string;
        firstName: string;
        lastName: string;
        photoURL?: string;
    }[];
    comments: {
        id: string;
        content: string;
        upvotes: number;
        downvotes: number;
        timePosted: string;
        parent?: {
            id: string;
        };
        author: {
            id: string;
            firstName: string;
            lastName: string;
            userName: string;
            photoURL?: string;
        };
        replies: {
            id: string;
            content: string;
            upvotes: number;
            downvotes: number;
            timePosted: string;
            parent?: {
                id: string;
            };
            author: {
                firstName: string;
                lastName: string;
                userName: string;
                photoURL?: string;
            };
        }[];
        upvotedBy: {
            id: string;
        }[];
        downvotedBy: {
            id: string;
        }[];
    }[];
    upvotedBy: {
        id: string;
    }[];
    downvotedBy: {
        id: string;
    }[];
    bookmarkedBy: {
        id: string;
    }[];
}
export interface userForCollaboration {
    id: string;
    firstName: string;
    lastName: string;
    userName: string | null;
    photoURL?: string | null;
}
