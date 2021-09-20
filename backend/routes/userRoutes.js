import express from 'express'
import { authenticateUser, getAllUsers, getLoggedInUser, getUserById, updateUserProfile } from '../controllers/userController.js'
import {protect, admin} from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect,admin,getAllUsers)
router.route('/login').post(authenticateUser)
router.route('/profile').get(protect, getLoggedInUser).put(protect, updateUserProfile)
router.route('/:id').get(protect,admin,getUserById)
export default router