import express from 'express'
import { addPlayerToTeam, createTeam, deleteTeam, getAllTeams, getTeamById, removePlayerFromTeam, updateTeamById } from '../controllers/teamController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/')
    .get(protect,admin,getAllTeams)
    .post(protect,admin,createTeam)

router.route('/addPlayer/:id').put(protect,admin,addPlayerToTeam)

router.route('/removePlayer/:id').put(protect,admin,removePlayerFromTeam)

router.route('/:id')
    .get(protect, getTeamById)
    .put(protect,admin,updateTeamById)
    .delete(protect,admin,deleteTeam)




export default router