import express from "express";
import verifyToken from "../utils/verifyToken";
import { postComment } from "../controllers/comment.controller";

const router = express.Router();


router.post('/post/:newsId', verifyToken, postComment); 
router.post('/upvote/:newsId', verifyToken, postComment); 
router.post('/downvote/:newsId', verifyToken, postComment); 
router.post('/edit/:newsId', verifyToken, postComment); 
router.post('/delete/:newsId', verifyToken, postComment); 

export default router;