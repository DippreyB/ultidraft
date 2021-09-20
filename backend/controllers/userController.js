import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

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



export {getAllUsers, getUserById, authenticateUser, getLoggedInUser, updateUserProfile}