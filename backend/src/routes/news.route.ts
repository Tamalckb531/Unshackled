import express from "express";
import { bookmarkedNews, downvoteNews, getFlare, getNews, getNewsById, postComment, upvoteNews } from "../controllers/news.controller";
import verifyToken from "../utils/verifyToken";
import getUserMid from "../utils/getUserMid";

const router = express.Router();

router.get('/posts', getNews);
router.get('/posts/flares', getFlare);
router.get('/posts/:newsId', getUserMid, getNewsById);
router.put('/posts/upvote/:newsId', verifyToken, upvoteNews);
router.put('/posts/downvote/:newsId', verifyToken, downvoteNews); 
router.put('/posts/bookmark/:newsId', verifyToken, bookmarkedNews); 
router.post('/posts/comments/:newsId', verifyToken, postComment); 

export default router;