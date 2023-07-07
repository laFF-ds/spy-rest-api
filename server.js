require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db
.once('open', () => console.log('Connected to Database'))
.once('close', () => console.log('Disconnected from Database'))

app.use(express.json())
app.use(
    cors({
        origin: "*",
    })
)
const agentsRouter = require('./routes/agents')
app.use('/agents', agentsRouter)
app.listen(3000, () => console.log('Server Started'))