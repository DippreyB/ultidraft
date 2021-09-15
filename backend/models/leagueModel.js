import mongoose from 'mongoose'

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
    ]
})

const League = mongoose.model('League', leagueSchema)

export default League