"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.NewsSchema = exports.CommentSchema = exports.SignUpSchema = void 0;
const zod_1 = require("zod");
//? Zod Schema
const BaseAuthSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5)
});
exports.SignUpSchema = BaseAuthSchema.extend({
    firstName: zod_1.z.string().min(3).max(10),
    lastName: zod_1.z.string().min(3).max(10),
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
});
exports.LoginSchema = BaseAuthSchema;
