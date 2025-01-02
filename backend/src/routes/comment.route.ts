import express from "express";
import verifyToken from "../utils/verifyToken";
import { postComment, upvoteComment } from "../controllers/comment.controller";

const router = express.Router();


router.post('/post/:newsId', verifyToken, postComment); 
router.put('/upvote/:commentId', verifyToken, upvoteComment); 
// router.put('/downvote/:newsId', verifyToken, postComment); 
// router.put('/edit/:newsId', verifyToken, postComment); 
// router.delete('/delete/:newsId', verifyToken, postComment); 

export default router;