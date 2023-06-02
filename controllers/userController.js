const { User } = require('../models')

const getAllUser = async (req, res) => {
    try {
        const data = await User.findAll()
         const result = {
            status: 'ok',
            data: data
        }
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

const createUser = async (req, res) => {
    try {
        const { username, password, token } = req.body
        const newUser = await User.create({
            username: username,
            password: password,
            token: token
        })
        res.status(201).json({
            status: 'ok',
            data: {
                id: newUser.id,
                username: newUser.username,
                password: newUser.password,
                token: newUser.token,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        })
    } catch (error) {
        console.log(error, '<--- error create user')
    }
}

module.exports = { getAllUser, createUser }