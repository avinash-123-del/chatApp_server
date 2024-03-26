import express from 'express';
import { addUsers, getAllUsers, getOneUser, loginUser } from '../controllers/ct_AddUsers.js';

const router = express.Router();

router.use(express.json())

router.route('/signin').post(addUsers)
router.route('/login').post(loginUser)
router.route('/getUsers').get(getAllUsers)
router.route('/oneUser').post(getOneUser)

export default router;