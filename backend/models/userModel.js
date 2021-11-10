import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema({
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
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }

}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.addPlayerId = function(id){
    this.playerId = id
    return this.save()
}

const User = mongoose.model('User', userSchema)

export default User