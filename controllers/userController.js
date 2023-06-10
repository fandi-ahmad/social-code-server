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
        console.log(error, '<-- error get user')
    }
}

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const newUser = await User.create({
            username: username,
            password: password,
        })
        res.status(201).json({
            status: 'ok',
            data: {
                id: newUser.id,
                username: newUser.username,
                password: newUser.password,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        })
    } catch (error) {
        console.log(error, '<--- error create user')
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id)
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'data is not found'
            })
        }

        user.destroy()
        res.json({
            status: 'ok',
            message: 'delete successfully'
        })
    } catch (error) {
        console.log(error, 'error delete user');
    }
}

module.exports = { getAllUser, createUser, deleteUser }