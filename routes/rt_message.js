import express from 'express';
import { addMessage, getMessages } from '../controllers/ct_message.js';

const router = express.Router();

router.use(express.json())

router.route('/').post(addMessage)
router.route('/:chatId').post(getMessages)

export default router;