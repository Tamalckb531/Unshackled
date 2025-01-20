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

export const CommentSchema = z.object({
    content: z.string().trim().min(2).max(1000),
    parentId: z.string().cuid().optional(),
});

export const NewsSchema = z.object({
  title: z.string().trim().min(15).max(150),
  content: z.string().trim().min(300),
  posterImage: z.string().optional(),
  flare: z.string(),
  is_Author_Anonymous: z.boolean().optional(),
  collaborators: z.array(
    z.object({
      id: z.string().uuid(),
      firstName: z.string(),
      lastName: z.string(),
      photoURL: z.string().url().optional(),
    })
  ).optional(),
});

export const LoginSchema = BaseAuthSchema;

//? Types from zod
export type SignUpBodyTypes = z.infer<typeof SignUpSchema>
export type LoginBodyTypes = Pick<SignUpBodyTypes, 'email' | 'password'>;
export type CommentBodyTypes = z.infer<typeof CommentSchema>;
export type CreateNewsTypes = z.infer<typeof NewsSchema>; 


//? Interfaces
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
      id: string,
      firstName: string,
      lastName: string,
      photoURL?: string
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
      upvotedBy: { id: string }[];
      downvotedBy: { id: string }[];
    }[];
  
    // New fields to track user interactions
    upvotedBy: { id: string }[];
    downvotedBy: { id: string }[];
    bookmarkedBy: { id: string }[];
}
