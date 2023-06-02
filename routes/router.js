const router = require("express").Router()
const userRouter = require('./usersRouter')

router.use('/api/v1', userRouter)

module.exports = router