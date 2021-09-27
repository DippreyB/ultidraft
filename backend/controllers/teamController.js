import Team from '../models/teamModel.js'
import asyncHandler from 'express-async-handler'


//@desc     Get all teams
//@route    GET /api/teams
//@access   private/admin
const getAllTeams = asyncHandler(async (req,res) =>{
    const teams = await Team.find()
    if(teams){
        res.json(teams)
    } else{
        res.status(400)
        throw new Error('No teams Found')
    }
})

//@desc     Get team by id
//@route    GET /api/teams/:id
//@access   protected
const getTeamById = asyncHandler(async (req, res) =>{
    const team = await Team.findById(req.params.id)
    if(team){
        res.json(team)
    }else{
        res.status(404)
        throw new Error('Team not found')
    }
})

//@desc     Create a team, and return created team in json. 
//          Front end makes call to add team to league
//@route    POST /api/teams
//@access   private/admin
const createTeam = asyncHandler(async (req,res)=> {
    const newTeam = {
        teamName: req.body.teamName,
        color: req.body.color,
        roster: [],
        maleDraftOrder: req.body.maleDraftOrder,
        femaleDraftOrder: req.body.femaleDraftOrder
    }

    const createdTeam = await Team.create(newTeam)
    res.json(createdTeam)
})


//@desc     Update team document without roster
//@route    PUT /api/teams/:id
//@access   private/admin
const updateTeamById = asyncHandler(async (req,res) => {
    const team = await Team.findById(req.params.id)
    if(team){
        team.teamName = req.body.teamName || team.teamName
        team.color = req.body.color || team.color
        team.maleDraftOrder = req.body.maleDraftOrder || team.maleDraftOrder
        team.femaleDraftOrder = req.body.femaleDraftOrder || team.femaleDraftOrder
        const updatedTeam = await team.save()
        res.json(updatedTeam)
    }else{
        res.status(404)
        throw new Error('Unable to update team. Not Found.')
    }

    
})

//@desc     Delete team by id
//@route    DELETE /api/teams/:id
//@access   private admin
const deleteTeam = asyncHandler(async (req,res) =>{
    const team = await Team.findById(req.params.id)
    if(team){
        const removedTeam = await team.remove()
        res.json(removedTeam)
    }else{
        res.status(404)
        throw new Error('Team not found, unable to delete.')
    }
})

//@desc     Add player to team
//@route    PUT /api/teams/addPlayer/:id
//@access   private/admin 
const addPlayerToTeam = asyncHandler(async (req,res) =>{
    const team  = await Team.findById(req.params.id)
    if(team){
        team.roster.push(req.body.playerId)
        const updatedTeam = await team.save()
        res.json(updatedTeam)
    } else{
        res.status(404)
        throw new Error('Team not found, unable to add player.')
    }
})

//@desc     Remove player from team
//@route    PUT /api/teams/removePlayer/:id
//@access   private/admin 
const removePlayerFromTeam = asyncHandler(async (req,res) => {
    const team = await Team.findById(req.params.id)
    if(team){
        team.roster = team.roster.filter(playerId => playerId != req.body.playerId)
        const updatedTeam = await team.save()
        res.json(updatedTeam)
    }else{
        res.status(404)
        throw new Error('Team not found, unable to remove player.')
    }
})

export {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeamById,
    deleteTeam,
    addPlayerToTeam,
    removePlayerFromTeam
}