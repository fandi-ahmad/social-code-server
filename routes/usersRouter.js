const { refreshToken } = require("../controllers/refreshToken")
const { getAllUser, registerUser, deleteUser, loginUser} = require("../controllers/userController")
const router = require("express").Router()
const { verifyToken } = require('../middleware/VerifyToken')

router.get('/user', verifyToken , getAllUser)
router.post('/register', registerUser)
router.delete('/user/:id', deleteUser)
router.post('/login', loginUser)
router.get('/token', refreshToken)

module.exports = router