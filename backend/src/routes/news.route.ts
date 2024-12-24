import express from "express";
import { getFlare, getNews } from "../controllers/news.controller";

const router = express.Router();

router.get('/posts', getNews);
router.get('/posts/flares', getFlare);

export default router;