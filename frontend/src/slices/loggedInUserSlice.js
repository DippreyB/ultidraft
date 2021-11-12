import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


const loggedInUserFromStorage = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')) : null

const initialState = {
    loggedInUser: loggedInUserFromStorage,
    error: null
};

export const logInGoogleUser = createAsyncThunk('loggedInUser/googleLogIn', async (userData) =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const res = await axios.post('/api/users/googleLogin', userData, config)
    console.log(res.data)
    return res.data
})

export const logInUser = createAsyncThunk('loggedInUser/login', async (data, {rejectWithValue}) =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try{
        const res = await axios.post('/api/users/login', data, config)
        return res.data
    }catch(error){
        return rejectWithValue(error.response.data.message)
    }
})


export const loggedInUserSlice = createSlice({
    name: 'loggedInUser',
    initialState,
    reducers: {
        logout: state => {
            state.loggedInUser = null
            state.error = null
            localStorage.clear()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logInGoogleUser.fulfilled, (state,action) => {
            state.loggedInUser = action.payload
            state.error = null
            localStorage.setItem('loggedInUser', JSON.stringify(state.loggedInUser))
        })
        .addCase(logInUser.fulfilled, (state,action) => {
            state.loggedInUser = action.payload
            state.error = null
            localStorage.setItem('loggedInUser', JSON.stringify(state.loggedInUser))
        })
        .addCase(logInUser.rejected, (state, action)=>{ 
            state.loggedInUser = null
            state.error = action.payload
        })
    }
})



export const selectLoggedInUser = state => state.loggedInUser
export const selectLoggedInUserToken = state => state.loggedInUser.loggedInUser.token
export const {logout} = loggedInUserSlice.actions
export default loggedInUserSlice.reducer