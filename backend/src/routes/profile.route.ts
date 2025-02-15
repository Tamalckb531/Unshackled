import express from "express";
import verifyToken from "../utils/verifyToken";
import { getUser, updateProfile } from "../controllers/profile.controller";


const router = express.Router();

router.put('/update',verifyToken, updateProfile);
router.get('/:userId', getUser);


export default router;