import React from 'react'
import {GoogleLogin} from 'react-google-login'
import { logInGoogleUser } from '../../slices/loggedInUserSlice'
import { useDispatch } from 'react-redux'


export const GoogleLoginButton = () => {

    const dispatch = useDispatch()

    const handleLogin = async (data) =>{
        dispatch(logInGoogleUser(data))
    }
    return (
        
        <GoogleLogin
            clientId = {process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
            buttonText = "Login"
            onSuccess ={handleLogin}
            onFailure = {handleLogin}
            uxMode={'popup'}
            cookiePolicy = {`single_host_origin`}
        />
    )
}
