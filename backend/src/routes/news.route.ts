import express from "express";
import { bookmarkedNews, createNews, downvoteNews, getFlare, getNews, getNewsById, getUserForCollaboration, upvoteNews } from "../controllers/news.controller";
import verifyToken from "../utils/verifyToken";
import getUserMid from "../utils/getUserMid";

const router = express.Router();

router.get('/posts', getNews);
router.get('/posts/flares', getFlare);
router.get('/posts/:newsId', getUserMid, getNewsById);
router.put('/posts/upvote/:newsId', verifyToken, upvoteNews);
router.put('/posts/downvote/:newsId', verifyToken, downvoteNews); 
router.put('/posts/bookmark/:newsId', verifyToken, bookmarkedNews); 
router.post('/editor/create', verifyToken, createNews);
router.get('/editor/userSearch', verifyToken, getUserForCollaboration);

export default router;