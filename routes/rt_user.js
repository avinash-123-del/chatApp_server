import express from 'express';
import { addUsers, getAllUsers, getUserById, loginUser } from '../controllers/ct_AddUsers.js';

const router = express.Router();

router.use(express.json())

router.route('/signin').post(addUsers)
router.route('/login').post(loginUser)
router.get('/getUsers' ,getAllUsers)
router.get('/getUsersbyId' ,getUserById)

export default router;