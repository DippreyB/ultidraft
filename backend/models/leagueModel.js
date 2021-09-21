import mongoose from 'mongoose'
import Player from './playerModel.js'

const leagueSchema = mongoose.Schema({
    leagueName: {
        type: String,
        required: true
    },
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Team'
        }
    ],
    signUpCode: {
        type: String,
        required: true
    }

})


const League = mongoose.model('League', leagueSchema)

export default League