import express from "express";
import { getFlare, getNews, getNewsById } from "../controllers/news.controller";

const router = express.Router();

router.get('/posts', getNews);
router.get('/posts/flares', getFlare);
router.get('/posts/:newsId', getNewsById);

export default router;