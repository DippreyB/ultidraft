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
    }
})


export const selectActivePlayers = state => state.players

export default playersSlice.reducer