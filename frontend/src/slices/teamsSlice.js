import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { logout } from "./loggedInUserSlice";

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

export const removePlayerIdFromTeamRoster = createAsyncThunk('teams/removePlayer', async({playerId, teamId}, {getState}) => {
    const userToken = getState().loggedInUser.loggedInUser.token
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        }
    }
    
    const {data: updatedTeam} = await axios.put(`/api/teams/removePlayer/${teamId}`,{playerId}, config)
    //dispatch removeTeamIdFromPlayer
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
    }
})

export const selectActiveTeams = state => state.teams

export default teamsSlice.reducer