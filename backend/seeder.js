import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import League from './models/leagueModel.js'
import leagues from './data/leagues.js'
import Team from './models/teamModel.js'
import teams from './data/teams.js'
import players from './data/players.js'
import Player from './models/playerModel.js'
import User from './models/userModel.js'
import users from './data/users.js'


dotenv.config()

connectDB()

const importData = async () => {
    try{
        await League.deleteMany()
        await Team.deleteMany()
        await Player.deleteMany()
        await User.deleteMany()

        //Create League document
        const createdLeague = await League.insertMany(leagues)
        const league = createdLeague[0]
        const leagueId = createdLeague[0]._id

        //Create team document
        const createdTeams = await Team.insertMany(teams)
       
        const teamIds = createdTeams.map(team => {
            return team._id
        })

        //add team ids to League doc
        const leagueWithTeams = await League.findByIdAndUpdate(leagueId,
            {$push: {teams: teamIds}},
            {upsert: true}
        )

        //Add leagueId to all players
        const updatedPlayers = players.map(player => {
            return {...player, league: leagueId}
        })

        const createdPlayers = await Player.insertMany(updatedPlayers)

        const playerIds = createdPlayers.map(player => {
            return player._id
        })

        //add players and captains to team
        await Promise.all( teamIds.map( async (teamId, index) => {
            const team = await Team.findById(teamId)
            if(team){
                team.roster = [...team.roster, playerIds[index]]
            }
            const updatedTeam = await team.save()
        }))

        await Promise.all(playerIds.map(async (playerId, index)=> {
            const player = await Player.findById(playerId)
            if(player.isCaptain){
                player.team = teamIds[index]
            }

            await player.save()
        }))

        //Add users
        const updatedUsers = users.map(user => {
            return {...user, leagues: leagueId}
        })

        await User.insertMany(updatedUsers)


        console.log('Data Imported'.green.inverse)
        process.exit() 
    }catch(error){
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}


const destroyData = async () => {
    try{
        await League.deleteMany()
        console.log('Data Destroyed'.red.inverse)
        process.exit() 
    }catch(error){
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] == '-d'){
    destroyData()
}else{
    importData()
}