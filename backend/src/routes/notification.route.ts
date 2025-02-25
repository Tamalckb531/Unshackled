import express from "express";
import verifyToken from "../utils/verifyToken";
import { createNotification, getNotifications, getUnCheckedCount, setCheckNotifications } from "../controllers/notification.controller";

const router = express.Router();

router.get('/bulk', verifyToken, getNotifications);
router.get('/getUnCheck', verifyToken, getUnCheckedCount);
router.put('/setCheck', verifyToken, setCheckNotifications);
router.post('/create', verifyToken, createNotification);

export default router;