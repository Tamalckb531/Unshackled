import express from "express";
import { getNews } from "../controllers/news.controller";

const router = express.Router();

router.post('/posts', getNews);

export default router;