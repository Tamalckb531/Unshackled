import express from "express";
import verifyToken from "../utils/verifyToken";
import { deleteComment, downvoteComment, postComment, upvoteComment } from "../controllers/comment.controller";

const router = express.Router();


router.post('/post/:newsId', verifyToken, postComment); 
router.put('/upvote/:commentId', verifyToken, upvoteComment); 
router.put('/downvote/:commentId', verifyToken, downvoteComment); 
// router.put('/edit/:commentId', verifyToken, postComment); 
router.delete('/delete/:commentId', verifyToken, deleteComment); 

export default router;