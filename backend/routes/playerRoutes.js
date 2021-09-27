import express from 'express'
import { createPlayer, deletePlayer, getAllPlayers, getPlayerById, getPlayersbyLeagueId, updatePlayer } from '../controllers/playerController.js'
import {protect, admin} from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/')
    .get(protect,admin,getAllPlayers)
    .post(protect,admin,createPlayer)

router.route('/:id')
    .get(protect, getPlayerById)
    .put(protect,admin,updatePlayer)
    .delete(protect,admin,deletePlayer)

router.route('/league/:leagueId')
    .get(protect,admin,getPlayersbyLeagueId)


export default router