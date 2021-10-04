import League from '../models/leagueModel.js'
import asyncHandler from 'express-async-handler'


//@desc     get all league documents
//@route    GET /api/leagues
//@access   private/admin 
const getAllLeagues = asyncHandler( async (req, res) => {
    const leagues = await League.find()

    if(leagues){
        res.json({leagues})
    }
    else{
        res.status(404)
        throw new Error('No leagues found')
    }
})

//@desc     Get league doc by id
//@route    GET/API/leagues
//@access   protected
const getLeaguebyId = asyncHandler(async (req,res) =>{
    const league = await League.findById(req.params.id)
    if(league){
        res.json({
            _id: league._id,
            leagueName: league.leagueName,
            teams: league.teams,
            signUpCode: league.signUpCode
        })
    }
    else{
        res.status(404)
        throw new Error('League not found.')
    }
})

const getLeaguesForUser = asyncHandler(async (req,res) => {
    const leagueIds = req.user.leagues
    const leagues = await League.find({'_id': {$in: leagueIds}})
    res.json(leagues)
})


//@desc     Create a new league document
//@route    POST/api/leagues 
//@access   private/admin 
const createLeague = asyncHandler( async (req,res) => {
    const newLeague = {
        leagueName: req.body.leagueName,
        teams: [],
        signUpCode: req.body.signUpCode,
    }

    const createdLeague = await League.create(newLeague)
    res.json(createdLeague)

})


//@desc     Delete league doc by id
//@route    DELETE /api/leagues/:id 
//@access   private/admin 
const deleteLeagueById = asyncHandler(async (req,res) =>{
    const league = await League.findById(req.params.id)
    if(league){
        const deletedLeague = await league.remove();
        res.json({deletedLeague})
    }else{
        res.status(400)
        throw new Error('League not found. Delete not performed.')
    }
})

//@desc     modify league by id
//@route    PUT /api/leagues/:id 
//@access   private/admin 
const updateLeagueById = asyncHandler(async (req,res) =>{
    const league = await League.findById(req.params.id)
    if(league){
        league.leagueName = req.body.leagueName || league.leagueName
        //league.teams = req.body.teams || league.teams
        league.signUpCode = req.body.signUpCode || league.signUpCode

        const updatedLeague = await league.save()

        res.json({updatedLeague})
    }else{
        res.status(400)
        throw new Error('League not found. Update not performed.')
    }
})

//@desc     add a team to a league doc
//@route    PUT /api/leagues/addTeam/:id
//@access   private/admin
const addTeamToLeague = asyncHandler(async (req,res) =>{
    const league = await League.findById(req.params.id)
    if(league){
        league.teams.push(req.body.id)
        const updatedLeague = await league.save()
        res.json({updatedLeague})
    } else{
        res.status(404)
        throw new Error('League not found')
    }
})


//@desc     remove team from a league doc
//@route    PUT /api/leagues/removeTeam/:id
//@access   private/admin
const removeTeamFromLeague = asyncHandler(async (req,res) =>{
    const league = await League.findById(req.params.id)
    if(league){
        
        league.teams = league.teams.filter(teamId => teamId != req.body.id)
        
        const updatedLeague = await league.save()
        res.json(updatedLeague)
    }
    else{
        res.status(404)
        throw new Error('League not found, unable to remove team.')
    }
})




export {
    getAllLeagues, 
    getLeaguebyId, 
    createLeague, 
    deleteLeagueById, 
    updateLeagueById,
    addTeamToLeague,
    removeTeamFromLeague,
    getLeaguesForUser
}