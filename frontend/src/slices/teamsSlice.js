import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../lib/axios'
import { logout } from "./loggedInUserSlice";
import {removeTeamIdFromPlayer, addTeamIdToPlayer} from './playersSlice'

const initialState = {
    activeLeagueTeams: undefined,
    error: null,
}

export const getActiveLeagueTeams = createAsyncThunk('teams/activeTeams', async({leagueId})=> {
    const {data: activeLeagueTeams} = await axios.get(`/api/teams/league/${leagueId}`)
    return activeLeagueTeams
})

export const removePlayerFromTeam = createAsyncThunk('teams/removePlayer', async({playerId, teamId}, {dispatch}) => {
    const {data: updatedTeam} = await axios.put(`/api/teams/removePlayer/${teamId}`,{playerId})
    await dispatch(removeTeamIdFromPlayer({playerId, teamId}))
    return updatedTeam
})

export const addPlayerToTeam = createAsyncThunk('teams/addPlayer', async({playerId, teamId},{dispatch})=> {
    const {data: updatedTeam} = await axios.put(`/api/teams/addPlayer/${teamId}`,{playerId})
    await dispatch(addTeamIdToPlayer({playerId, teamId}))
    return updatedTeam
})

const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getActiveLeagueTeams.fulfilled, (state, action) =>{
            state.activeLeagueTeams = action.payload
        })
        builder.addCase(logout, (state,action) => {
            state.activeLeagueTeams = undefined
        })
        builder.addCase(removePlayerFromTeam.fulfilled, (state,action) =>{ 
            const team = state.activeLeagueTeams.find(team => team._id === action.payload._id)
            if(team){
                team.roster = action.payload.roster
            }
        })
        builder.addCase(addPlayerToTeam.fulfilled, (state,action) => {
            const team = state.activeLeagueTeams.find(team => team._id === action.payload._id) //missing an _ on id... how am i so stupid
            if(team){
                team.roster = action.payload.roster
            }
        })
    }
})

export const selectActiveTeams = state => state.teams

export default teamsSlice.reducer