import express from "express";
import { bookmarkedNews, createNews, downvoteNews, featureNews, getFlare, getNews, getNewsById, getUserForCollaboration, getUserNews, isFeaturedNews, upvoteNews } from "../controllers/news.controller";
import verifyToken from "../utils/verifyToken";
import getUserMid from "../utils/getUserMid";

const router = express.Router();

router.get('/posts', getNews);
router.get('/posts/flares', getFlare);
router.get('/posts/:newsId', getUserMid, getNewsById);
router.get('/posts/userNews/:userId/:flare', getUserNews);
router.get('/editor/userSearch', verifyToken, getUserForCollaboration);
router.get('/posts/isFeatured/:newsId', verifyToken, isFeaturedNews);

router.put('/posts/upvote/:newsId', verifyToken, upvoteNews);
router.put('/posts/downvote/:newsId', verifyToken, downvoteNews); 
router.put('/posts/bookmark/:newsId', verifyToken, bookmarkedNews); 
router.put('/posts/feature/:newsId', verifyToken, featureNews); 

router.post('/editor/create', verifyToken, createNews);

export default router;