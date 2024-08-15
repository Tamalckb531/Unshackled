"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.SignUpSchema = void 0;
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
exports.LoginSchema = BaseAuthSchema;
