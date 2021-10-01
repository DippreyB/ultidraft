import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import bcrypt from 'bcryptjs'

const initialState = {
    loggedInUser: {},
    status: 'idle',
    error: null
};

export const logInGoogleUser = createAsyncThunk('loggedInUser/googleLogIn', async (userData) =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const res = await axios.post('/api/users/googleLogin', userData, config)
    return res.data
})

export const logInUser = createAsyncThunk('loggedInUser/login', async (data) =>{
    //const {email, password} = data
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    //const hashedPassword = await bcrypt.hashSync(password, 10)
    //const userData = {email: email, password: hashedPassword}
    const res = await axios.post('/api/users/login', data,  config)
    return res.data
})

export const loggedInUserSlice = createSlice({
    name: 'loggedInUser',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(logInGoogleUser.fulfilled, (state,action) => {
            state.loggedInUser = action.payload
        })
        .addCase(logInUser.fulfilled, (state,action) => {
            state.loggedInUser = action.payload
        })
    }
})

export const selectLoggedInUser = state => state.loggedInUser



export const {updateLoggedInUser, clearLoggedInUser} = loggedInUserSlice.actions
export default loggedInUserSlice.reducer