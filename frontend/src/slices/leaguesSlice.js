import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { logout } from "./loggedInUserSlice";


const initialState = {
    userLeagues: [],
    adminLeagues: [],
    activeLeague: {},
    error: null
}

export const getAdminLeagues = createAsyncThunk('leagues/adminLeagues', async (_, {getState}) =>{
    const userToken = getState().loggedInUser.loggedInUser.token
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        }
    }
        const res = await axios.get(`/api/leagues/`, config)
        return res.data
})

export const getUserLeagues = createAsyncThunk('leagues/userLeagues', async (_, {getState}) =>{
    const userToken = getState().loggedInUser.loggedInUser.token
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        }
    }
        const res = await axios.get(`/api/leagues/myLeagues`, config)
        return res.data
})

export const getActiveLeague = createAsyncThunk('leagues/selectedLeague', async ({leagueId}, {getState}) => {
    const userToken = getState().loggedInUser.loggedInUser.token
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        }
    }
    
    const {data: activeLeaguePlayers} = await axios.get(`/api/players/league/${leagueId}`,config)
    const {data: activeLeagueTeams} = await axios.get(`/api/teams/league/${leagueId}`,config)
    return {
        activeLeaguePlayers,
        activeLeagueTeams
    }
})

const leaguesSlice = createSlice({
    name:"leagues",
    initialState,
    reducers: {

    },
    extraReducers: (builder) =>{
        builder.addCase(getAdminLeagues.fulfilled, (state, action) =>{
            state.adminLeagues = action.payload.leagues
        })
        .addCase(getUserLeagues.fulfilled, (state,action) =>{
            state.userLeagues = action.payload
        })
        .addCase(getActiveLeague.fulfilled, (state,action)=> {
            state.activeLeague = action.payload
        })
        .addCase(logout, (state,action) => {
            state.userLeagues = []
            state.adminLeagues = []
            state.activeLeague = {}
            state.error = null
        })
    }
})

export const selectLeagues = state => state.leagues
export const selectActiveLeague = state => state.leagues.activeLeague

export default leaguesSlice.reducer