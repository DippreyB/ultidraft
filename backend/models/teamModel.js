import mongoose from 'mongoose'


const teamSchema = mongoose.Schema({
    teamName: {
        type: String,
        required: true,
    },
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

teamSchema.methods.removePlayer = function(playerId){
    this.roster = this.roster.filter(player =>{
        return player != playerId
    })
    return this.save()
}
teamSchema.methods.addPlayer = function(playerId){
    this.roster.push(playerId)
    return this.save()
}

const Team = mongoose.model('Team', teamSchema)

export default Team