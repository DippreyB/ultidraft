import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API RUNNING THIS SHIT')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`.green))

