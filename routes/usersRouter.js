const { getAllUser, createUser, deleteUser } = require("../controllers/userController")
const router = require("express").Router()

router.get('/user', getAllUser)
router.post('/user', createUser)
router.delete('/user/:id', deleteUser)

module.exports = router