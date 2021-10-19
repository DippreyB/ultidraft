import mongoose from 'mongoose'

const playerSchema = mongoose.Schema({
    playerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    genderMatchup: {
        type: String,
        required: true
    },
    baggageGroupId: {
        type: String,
    },
    selfRating: {
        type: Number,
        required: true
    },
    stamina: {
        type: Number,
        required: true
    },
    running: {
        type: Number,
        required: true
    },
    jumping: {
        type: Number,
        required: true
    },
    forehand: {
        type: Number,
        required: true
    },
    backhand: {
        type: Number,
        required: true
    },
    hammer: {
        type: Number,
        required: true
    },
    experience: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    comments: {
        type: String
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    league: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'League'
    },
    draftRanking: {
        type: Number,
    },
    isCaptain: {
        type: Boolean,
        required: true,
        default: false,
    }
})

playerSchema.methods.removeTeamFromPlayer = function(){
    this.team = undefined
    return this.save()
}

playerSchema.methods.addTeamIdToPlayer = function(teamId){
    this.team  = teamId
    return this.save()
}

const Player = mongoose.model('Player', playerSchema)

export default Player