const express = require('express')
const app = express()
const port = 8000
const router = require('./routes/router')
const { config } = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')

config()
app.use(cors({Credential: true, origin: process.env.USER_URL_ADDRESS}))
app.use(cookieParser())
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`Server ready on port ${port}`)
})