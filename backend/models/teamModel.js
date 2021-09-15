import mongoose from 'mongoose'


const teamSchema = mongoose.Schema({
    teamName: {
        type: String,
        required: true,
    },
    captains: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    color: {
        type: String,
    },
    roster: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Player",
        }
    ],
    maleDraftOrder: {
        type: Number,
        required: true
    },
    femaleDraftOrder: {
        type: Number,
        required: true
    }
})

const Team = mongoose.model('Team', teamSchema)

export default Team