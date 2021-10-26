import {configureStore} from '@reduxjs/toolkit'
import leaguesSlice from './slices/leaguesSlice'
import loggedInUserSlice from './slices/loggedInUserSlice'
import playersSlice from './slices/playersSlice'
import teamsSlice from './slices/teamsSlice'

export const store =  configureStore({
    reducer: {
        loggedInUser: loggedInUserSlice,
        leagues: leaguesSlice, 
        players: playersSlice,
        teams: teamsSlice,
    }
})