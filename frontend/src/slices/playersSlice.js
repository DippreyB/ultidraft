import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../lib/axios'
import { logout } from "./loggedInUserSlice";

const initialState = {
    activeLeaguePlayers: undefined,
    error: null,
}

export const getActiveLeaguePlayers = createAsyncThunk('players/activePlayers', async ({leagueId}) =>{
    const {data: activeLeaguePlayers} = await axios.get(`/api/players/league/${leagueId}`)
    return activeLeaguePlayers
})

export const removeTeamIdFromPlayer = createAsyncThunk('players/removeId',async({playerId, teamId})=> {
    const {data: updatedPlayer} = await axios.put(`/api/players/${playerId}/removeTeam`,{teamId})
    return updatedPlayer
})

export const addTeamIdToPlayer = createAsyncThunk('players/addId',async({playerId, teamId})=> {
    const {data: updatedPlayer} = await axios.put(`/api/players/${playerId}/addTeam`,{teamId})
    return updatedPlayer
})

export const togglePlayerCaptainStatus = createAsyncThunk('players/toggleCaptain', async({playerId}) => { 
    const {data: updatedPlayer} = await axios.put(`/api/players/${playerId}/captain`)
    return updatedPlayer
})

const playersSlice = createSlice({
    name:"players", 
    initialState,
    reducers: {

    },
    extraReducers: (builder) =>{
        builder.addCase(getActiveLeaguePlayers.fulfilled, (state, action) => {
            state.activeLeaguePlayers = action.payload
        })
        .addCase(logout, (state,action) =>{
            state.activeLeaguePlayers = undefined
        })
        .addCase(removeTeamIdFromPlayer.fulfilled, (state,action) => {
            const player = state.activeLeaguePlayers.find(player => player._id === action.payload._id)
            if(player){
                player.team = action.payload.team
                player.isCaptain = action.payload.isCaptain
            }
        })
        .addCase(addTeamIdToPlayer.fulfilled, (state,action) => { 
            const player = state.activeLeaguePlayers.find(player => player._id === action.payload._id)
            if(player){
                player.team = action.payload.team
            }
        })
        .addCase(togglePlayerCaptainStatus.fulfilled, (state,action) => { 
            const player = state.activeLeaguePlayers.find(player => player._id === action.payload._id)
            if(player){
                player.isCaptain = action.payload.isCaptain
            }
        })
    }
})


export const selectActivePlayers = state => state.players

export default playersSlice.reducer