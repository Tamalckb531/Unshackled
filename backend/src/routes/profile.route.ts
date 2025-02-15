import express from "express";
import verifyToken from "../utils/verifyToken";
import { updateProfile } from "../controllers/profile.controller";


const router = express.Router();

router.put('/update',verifyToken, updateProfile);


export default router;