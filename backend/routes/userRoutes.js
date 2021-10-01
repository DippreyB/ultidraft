import express from 'express'
import { authenticateUser, authGoogleUser, deleteUser, getAllUsers, getLoggedInUser, getUserById, registerUser, updateUserById, updateUserProfile } from '../controllers/userController.js'
import {protect, admin} from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect,admin,getAllUsers).post(registerUser)
router.route('/login').post(authenticateUser)
router.route('/profile').get(protect, getLoggedInUser).put(protect, updateUserProfile)
router.route('/googleLogin').post(authGoogleUser)
router.route('/:id').get(protect,admin,getUserById).put(protect,admin,updateUserById).delete(protect,admin,deleteUser)
export default router