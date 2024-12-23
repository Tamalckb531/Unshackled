import express from "express";
import { getNews } from "../controllers/news.controller";

const router = express.Router();

router.get('/posts', getNews);

export default router;