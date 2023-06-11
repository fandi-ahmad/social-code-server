const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/router')
const { config } = require('dotenv')
const cookieParser = require('cookie-parser')

config()
app.use(cookieParser())
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`Server ready on port ${port}`)
})