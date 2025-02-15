"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.profileEditSchema = exports.NewsSchema = exports.CommentSchema = exports.SignUpSchema = void 0;
const zod_1 = require("zod");
//? Zod Schema
const BaseAuthSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5)
});
exports.SignUpSchema = BaseAuthSchema.extend({
    firstName: zod_1.z.string().min(3).max(15),
    lastName: zod_1.z.string().min(3).max(20),
});
exports.CommentSchema = zod_1.z.object({
    content: zod_1.z.string().trim().min(2).max(1000),
    parentId: zod_1.z.string().cuid().optional(),
});
exports.NewsSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(15).max(150),
    content: zod_1.z.string().trim().min(300),
    posterImage: zod_1.z.string().optional(),
    flare: zod_1.z.string(),
    is_Author_Anonymous: zod_1.z.boolean().optional(),
    collaborators: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string().uuid(),
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        photoURL: zod_1.z.string().url().optional(),
    })).optional(),
});
/*
firstName          String
  lastName           String
  email              String    @unique
  password           String
  userName           String?   @unique @default(cuid())
  bio                String?
  photoURL           String?
  location
*/
exports.profileEditSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(3).max(15),
    lastName: zod_1.z.string().min(3).max(20),
    email: zod_1.z.string().email(),
    userName: zod_1.z.string().min(7).max(15),
    bio: zod_1.z.string().max(40).optional(),
    photoUrl: zod_1.z.string().optional(),
    location: zod_1.z.string().optional()
});
exports.LoginSchema = BaseAuthSchema;
;
