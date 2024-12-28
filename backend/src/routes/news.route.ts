import express from "express";
import { downvoteNews, getFlare, getNews, getNewsById, upvoteNews } from "../controllers/news.controller";
import verifyToken from "../utils/verifyToken";

const router = express.Router();

router.get('/posts', getNews);
router.get('/posts/flares', getFlare);
router.get('/posts/:newsId', getNewsById);
router.put('/posts/upvote/:newsId', verifyToken, upvoteNews);
router.put('/posts/downvote/:newsId', verifyToken, downvoteNews);

export default router;