import Jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//only allows access to logged in users.
const protect = asyncHandler( async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }catch(error){
            console.error(error)
            res.status(401)

            throw new Error('Not Authorized, token failed.')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not Authorized, invalid token')
    }
})

//allows access to logged in admin
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(401)
        throw new Error("Not Authorized.")
    }
}

//captain access
const captain = (req, res, next) =>{
    if(req.user && req.user.isCaptain){
        next()
    }
    else{
        res.status(401)
        throw new Error("Not Authorized.")
    }
}

export {protect, admin, captain}