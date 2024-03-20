import express from 'express';
import { addUsers, getAllUsers, loginUser } from '../controllers/ct_AddUsers.js';

const router = express.Router();

router.use(express.json())

router.route('/signin').post(addUsers)
router.route('/login').post(loginUser)
router.route('/getUsers').get(getAllUsers)

export default router;