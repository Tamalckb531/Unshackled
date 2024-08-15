import express from "express";
import { signUpProcess } from "../controllers/auth.controller";
import { loginProcess } from "../controllers/auth.controller";

const router = express.Router();

router.post('/signup', signUpProcess);
router.post('/login', loginProcess)

export default router;