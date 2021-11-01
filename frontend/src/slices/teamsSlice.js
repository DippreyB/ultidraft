import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { logout } from "./loggedInUserSlice";
import {removeTeamIdFromPlayer, addTeamIdToPlayer} from './playersSlice'

const initialState = {
    activeLeagueTeams: undefined,
    error: null,
}

export const getActiveLeagueTeams = createAsyncThunk('teams/activeTeams', async({leagueId}, {getState})=> {
    const userToken = getState().loggedInUser.loggedInUser.token
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        }
    }

    const {data: activeLeagueTeams} = await axios.get(`/api/teams/league/${leagueId}`,config)
    return activeLeagueTeams

})

export const removePlayerIdFromTeamRoster = createAsyncThunk('teams/removePlayer', async({playerId, teamId}, {getState, dispatch}) => {
    const userToken = getState().loggedInUser.loggedInUser.token
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        }
    }
    
    const {data: updatedTeam} = await axios.put(`/api/teams/removePlayer/${teamId}`,{playerId}, config)
    await dispatch(removeTeamIdFromPlayer(playerId))
    return updatedTeam
})

export const addPlayerIdToTeamRoster = createAsyncThunk('teams/addPlayer', async({playerId, teamId},{getState, dispatch})=> {
    const userToken = getState().loggedInUser.loggedInUser.token
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        }
    }

    const {data: updatedTeam} = await axios.put(`/api/teams/addPlayer/${teamId}`,{playerId}, config)
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
        builder.addCase(removePlayerIdFromTeamRoster.fulfilled, (state,action) =>{ 
            const team = state.activeLeagueTeams.find(team => team._id === action.payload._id)
            if(team){
                team.roster = action.payload.roster
            }
        })
        builder.addCase(addPlayerIdToTeamRoster.fulfilled, (state,action) => {
            const team = state.activeLeagueTeams.find(team => team._id === action.payload.id)
            if(team){
                team.roster = action.payload.roster
            }
        })
    }
})

export const selectActiveTeams = state => state.teams

export default teamsSlice.reducer