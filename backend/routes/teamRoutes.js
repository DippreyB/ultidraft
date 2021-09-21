import express from 'express'
import { createTeam, getAllTeams, getTeamById, updateTeamById } from '../controllers/teamController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/')
    .get(protect,admin,getAllTeams)
    .post(protect,admin,createTeam)

router.route('/:id')
    .get(protect, getTeamById)
    .put(protect,admin,updateTeamById)


export default router