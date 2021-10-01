import {configureStore} from '@reduxjs/toolkit'
import loggedInUserSlice from './slices/loggedInUserSlice'

export const store =  configureStore({
    reducer: {
        loggedInUser: loggedInUserSlice
    }
})