import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { logout } from "./loggedInUserSlice";
import { getActiveLeaguePlayers } from "./playersSlice";
import { getActiveLeagueTeams } from "./teamsSlice";


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

//get league name and ID from api. We probably dont want to request all league data (players, teams) at once.
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

//Call this when user selects a league to get all league info 
//change to only set active league in state. PlayersSlice and TeamsSlice will access activeLeague in state
export const getActiveLeague = createAsyncThunk('leagues/selectedLeague', async (leagueId, {getState, dispatch}) => {
    const userToken = getState().loggedInUser.loggedInUser.token
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        }
    }
    
    await dispatch(getActiveLeaguePlayers(leagueId))
    await dispatch(getActiveLeagueTeams(leagueId))
    return {
        leagueId
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
            localStorage.removeItem('selectedLeague')
        })
    }
})

export const selectLeagues = state => state.leagues
export const selectActiveLeague = state => state.leagues.activeLeague

export default leaguesSlice.reducer