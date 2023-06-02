const { getAllUser, createUser } = require("../controllers/userController")
const router = require("express").Router()

router.get('/user', getAllUser)
router.post('/user', createUser)

module.exports = router