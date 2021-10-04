import {configureStore} from '@reduxjs/toolkit'
import leaguesSlice from './slices/leaguesSlice'
import loggedInUserSlice from './slices/loggedInUserSlice'

export const store =  configureStore({
    reducer: {
        loggedInUser: loggedInUserSlice,
        leagues: leaguesSlice, 
    }
})