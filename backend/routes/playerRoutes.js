import express from 'express'
import { addTeamIdToPlayer, createPlayer, deletePlayer, getAllPlayers, getPlayerById, getPlayersbyLeagueId, removeTeamIdFromPlayer, togglePlayerIsCaptain, updatePlayer } from '../controllers/playerController.js'
import {protect, admin} from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/')
    .get(protect,admin,getAllPlayers)
    .post(protect,admin,createPlayer)

router.route('/:id/removeTeam')
    .put(protect,admin, removeTeamIdFromPlayer)

router.route('/:id/addTeam')
    .put(protect,admin,addTeamIdToPlayer)

router.route('/:id/captain')
    .put(protect,admin,togglePlayerIsCaptain)

router.route('/:id')
    .get(protect, getPlayerById)
    .put(protect,admin,updatePlayer)
    .delete(protect,admin,deletePlayer)



router.route('/league/:leagueId')
    .get(protect,getPlayersbyLeagueId)


export default router