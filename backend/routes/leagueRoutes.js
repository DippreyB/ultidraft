import express from 'express'
import { addTeamToLeague, createLeague, deleteLeagueById, getAllLeagues, getLeaguebyId, getLeaguesForUser, removeTeamFromLeague, updateLeagueById } from '../controllers/leagueController.js'
import {protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect,admin,getAllLeagues).post(protect,admin,createLeague)
router.route('/myLeagues').get(protect, getLeaguesForUser)

router.route('/addTeam/:id')
    .put(protect,admin,addTeamToLeague)

router.route('/removeTeam/:id')
    .put(protect,admin,removeTeamFromLeague)

router.route('/:id')
    .get(protect,getLeaguebyId)
    .delete(protect,admin,deleteLeagueById)
    .put(protect,admin,updateLeagueById)
export default router