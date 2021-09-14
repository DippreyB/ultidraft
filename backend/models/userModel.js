import mongoose from 'mongoose'

const userScehma = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    isCaptain: {
        type: Boolean,
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    leagues: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'League'
        }
    ],

}, {
    timestamps: true
})

const User = mongoose.model('User', userScehma)

export default User