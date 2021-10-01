import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import leagueRoutes from './routes/leagueRoutes.js'
import teamRoutes from './routes/teamRoutes.js'
import playerRoutes from './routes/playerRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import cors from 'cors'


dotenv.config()

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('API RUNNING THIS SHIT')
})

app.use('/api/users', userRoutes)
app.use('/api/leagues', leagueRoutes)
app.use('/api/teams', teamRoutes)
app.use('/api/players', playerRoutes)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`.green))

