import express from "express";
import verifyToken from "../utils/verifyToken";
import { followUser, getFollowees, getFollowers, getUser, isFollowing, updateProfile } from "../controllers/profile.controller";


const router = express.Router();

router.get('/:userId', getUser);
router.get('/isfollowing/:followId', verifyToken, isFollowing);
router.get('/getFollowers/:userId', getFollowers);
router.get('/getFollowings/:userId', getFollowees);

router.put('/update',verifyToken, updateProfile);
router.put("/follow/:followId", verifyToken, followUser);


export default router;