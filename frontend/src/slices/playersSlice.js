import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { logout } from "./loggedInUserSlice";

const initialState = {
    activeLeaguePlayers: undefined,
    error: null,
}

export const getActiveLeaguePlayers = createAsyncThunk('players/activePlayers', async ({leagueId}, {getState}) =>{
    const userToken = getState().loggedInUser.loggedInUser.token
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        }
    }
    const {data: activeLeaguePlayers} = await axios.get(`/api/players/league/${leagueId}`,config)

    return activeLeaguePlayers
})

export const removeTeamIdFromPlayer = createAsyncThunk('players/removeId',async({playerId}, {getState})=> {
    const userToken = getState().loggedInUser.loggedInUser.token
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        }
    }

    const {data: updatedPlayer} = await axios.put(`/api/players/${playerId}/removeTeam`,config)
    return updatedPlayer
})

export const addTeamIdToPlayer = createAsyncThunk('players/addId',async({playerId, teamId}, {getState})=> {
    const userToken = getState().loggedInUser.loggedInUser.token
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        }
    }

    const {data: updatedPlayer} = await axios.put(`/api/players/${playerId}/addTeam`,{teamId},config)
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
            }
        })
        .addCase(addTeamIdToPlayer.fulfilled, (state,action) => { 
            const player = state.activeLeaguePlayers.find(player => player._id === action.payload._id)
            if(player){
                player.team = action.payload.team
            }
        })
    }
})


export const selectActivePlayers = state => state.players

export default playersSlice.reducer