import express from 'express';
import { createChat, findChat, userChats } from '../controllers/ct_chat.js';

const router = express.Router();

router.use(express.json())

router.post("/" , createChat)
router.get("/:userId" , userChats)
router.get("/find/:firstId/:secondId" , findChat)



export default router