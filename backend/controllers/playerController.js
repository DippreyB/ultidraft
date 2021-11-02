import Player from "../models/playerModel.js";
import asyncHandler from 'express-async-handler'


//@desc     Get all players in all leagues
//@route    GET /api/players
//access    private/admin 
const getAllPlayers = asyncHandler( async (req, res) =>{
    const players = await Player.find()

    if(players){
        res.json(players)
    }else{
        res.status(404)
        throw new Error('Cannot find players.')
    }
})

//@desc     Get all players in a league by leagueId
//@route    GET /api/players/league/:leagueId
//@access   private
const getPlayersbyLeagueId = asyncHandler(async (req,res) =>{
    const players = await Player.find({league: req.params.leagueId})
    if(players){
        res.json(players)
    } else{
        res.status(404)
        throw new Error(`Unable to find players with league id: ${req.params.leagueId}`)
    }
})

//@desc     Get player by id.
//@route    GET /api/players/:id
//access    private
const getPlayerById = asyncHandler( async (req, res) => {
    const player = await Player.findById(req.params.id)
    if(player){
        res.json(player)
    }
    else{
        res.status(404)
        throw new Error(`Player not found for id ${req.params.id}`)
    }
})


//@desc     Create a player
//@route    POST /api/players
//access    private/admin
const createPlayer = asyncHandler(async (req, res) =>{

    console.log('test')
    const newPlayer = {
            "playerName": req.body.playerName,
            "email": req.body.email,
            "age": req.body.age,
            "genderMatchup": req.body.genderMatchup,
            "selfRating": req.body.selfRating,
            "stamina": req.body.stamina,
            "running": req.body.running,
            "jumping": req.body.jumping,
            "forehand":  req.body.forehand,
            "backhand": req.body.backhand,
            "hammer": req.body.hammer,
            "experience":req.body.experience,
            "role": req.body.role,
            "comments": req.body.comments,
            "league":   req.body.league,
            "isCaptain": req.body.isCaptain,
            "draftRanking": req.body.draftRanking,
            "team": req.body.team
    }
    console.log(newPlayer)
    const createdPlayer = await Player.create(newPlayer)
    res.json(createdPlayer)
})


//@desc     Update player information
//@route    PUT /api/players/:id
//access    private/admin
const updatePlayer = asyncHandler(async (req,res) => {
    const player = await Player.findById(req.params.id)
    if(player){
        player.playerName = req.body.playerName || player.playerName
        player.email = req.body.email || player.email
        player.age = req.body.age || player.age
        player.genderMatchup = req.body.genderMatchup || player.genderMatchup
        player.selfRating = req.body.selfRating || player.selfRating
        player.stamina = req.body.stamina || player.stamina
        player.running = req.body.running || player.running
        player.jumping = req.body.jumping || player.jumping
        player.forehand = req.body.forehand || player.forehand
        player.backhand = req.body.backhand || player.backhand
        player.hammer = req.body.hammer || player.hammer
        player.experience = req.body.experience || player.experience
        player.role = req.body.role || player.role
        player.comments = req.body.comments || player.comments
        player.isCaptain = (req.body.isCaptain == undefined) ? player.isCaptain : req.body.isCaptain
        player.draftRanking = req.body.draftRanking || player.draftRanking
        player.team = req.body.team || player.team

        const updatedPlayer = await player.save()
        res.json(player)
    }else {
        res.status(404)
        throw new Error('Unable to update user - not found.')
    }

    
})

//@desc     Delete player by id
//@route    DELETE /api/players/:id
//access    private/admin 
const deletePlayer = asyncHandler(async (req,res)=> {
    const player = await Player.findById(req.params.id)
    if(player){
        const deletedPlayer = await player.remove()
        res.json(deletedPlayer)
    }
    else{
        res.status(404)
        throw new Error('unable to delete player - not found')
    }
})


//@desc removes team id from player document then finds the removed team and removes player Id from team doc.
//route PUT /api/players/:id/removeTeam
//access private/admin 
const removeTeamIdFromPlayer = asyncHandler(async (req,res) => {
    console.log('removing team id...')
    const player = await Player.findById(req.params.id)
    
    if(player){
        const updatedPlayer = await player.removeTeam()
        res.json(updatedPlayer)
    }else{
        res.status(404)
        throw new Error('Player not found.')
    }
})

const addTeamIdToPlayer = asyncHandler(async (req,res) => { 
    const player = await Player.findById(req.params.id)
    if(player){
        const updatedPlayer = await player.addTeamId(req.body.teamId)
        res.json(updatedPlayer)
    }else{
        res.status(404)
        throw new Error('Player not found.')
    }
})





export {
    getAllPlayers,
    getPlayersbyLeagueId,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
    removeTeamIdFromPlayer,
    addTeamIdToPlayer
}

