import User from '../models/userModel.js'
import League from '../models/leagueModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import { OAuth2Client } from 'google-auth-library'


//@desc     get all users
//@route    GET /api/users
//@access   private/admin
const getAllUsers = asyncHandler( async (req,res) => {
    const users = await User.find({})

    if(users){
        res.json(users)
    }
    else{
        res.status(404)
        throw new Error('Users not found.')
    }
}
)

//@desc     get user by Id
//@route    GET /api/users/:id
//@access   private/admin
const getUserById = asyncHandler( async (req,res) => {
    const user = await User.findById(req.params.id)

    if(user){
        res.json(user)
    }
    else{
        res.status(404)
        throw new Error('User not found.')
    }
})

//@desc     log user in to website
//@route    POST /api/users/login
//@access   public
const authenticateUser = asyncHandler(async (req,res) =>{
    
    const {email, password} = req.body
    
    const user = await User.findOne({email})
    if(user && await user.matchPassword(password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isCaptain: user.isCaptain,
            leagues: user.leagues,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(401)
        throw new Error("Invalid password or email.")
    }
})

//@desc     log user in to website
//@route    GET /api/users/profile
//@access   private/user
const getLoggedInUser = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isCaptain: user.isCaptain,
            leagues: user.leagues,
            playerId: user.playerId
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc     Allows user to update name, email, and password
//@route    PUT /api/users/profile
//@access   private/user
const updateUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } 
    else{
        res.status(404)
        throw new Error('User not found')
    }

})


//@desc     Admin update user data.
//@route    PUT /api/users/:id
//@access   private/admin
const updateUserById = asyncHandler( async (req, res) => {
    
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin) === true ? true : false
        user.isCaptain = Boolean(req.body.isCaptain) === true ? true : false
        user.leagues = req.body.leagues || user.leagues

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isCaptain: updatedUser.isCaptain,
            leagues: updatedUser.leagues,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc     Register a new user.
//@route    POST /api/users
//@access   public
const registerUser = asyncHandler( async (req, res) => {
    const league = await League.findOne({signUpCode: req.body.signUpCode})
    
    const userExists = await User.findOne({email: req.body.email})
    if(userExists){
        res.status(400)
        throw new Error('Email address registered to an account. Use another email.')
    }
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
        isCaptain: false,
        leagues: [league]

    }
    const createdUser = await User.create(newUser)
    res.json(createdUser)
})

//@desc     Delete user by ID
//@route    DELETE /api/users/:id
//@access   private/admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        const deletedUser = await user.remove()
        res.json({message: `User Removed: ${deletedUser._id}` })
    }else{
        res.status(404)
        throw new Error('User not found')

    }
})

//@desc     Authenticate google user
//@route    POST /api/users/googleLogin
//@access   public
const authGoogleUser = asyncHandler(async (req, res) => {
    const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_ID)
    const ticket = await client.verifyIdToken({
        idToken: req.body.tokenId,
        audience: process.env.GOOGLE_AUTH_CLIENT_ID
    })

    const {email, email_verified, name, picture} = ticket.getPayload();

    const user = await User.findOne({email})
    if(!user){
        console.log('User not in database, creating new user.')
        const newUser = {
            name: name,
            email: email,
            isAdmin: false,
            isCaptain: false,
            leagues: [],
        }
        try{
            const createdUser = await User.create(newUser)
            res.json(createdUser)
        }catch(error){
            throw new Error(error)
        }
       
    }else{
        console.log('User found in database, logged in.')
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isCaptain: user.isCaptain,
            leagues: user.leagues,
            token: generateToken(user._id),
            playerId: user.playerId

        })
    }
})



export {
    getAllUsers, 
    getUserById, 
    authenticateUser, 
    getLoggedInUser, 
    updateUserProfile,
    updateUserById,
    registerUser,
    deleteUser,
    authGoogleUser
}