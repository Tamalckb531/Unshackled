import express from "express";
import { getCount, signout } from "../controllers/user.controller";
import verifyToken from "../utils/verifyToken";

const router = express.Router();

router.post('/signout', signout);
router.get('/getCount', verifyToken, getCount);

export default router;