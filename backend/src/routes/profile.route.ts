import express from "express";
import verifyToken from "../utils/verifyToken";


const router = express.Router();

router.put('/update',verifyToken);


export default router;