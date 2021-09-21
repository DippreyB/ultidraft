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


export {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeamById,
}