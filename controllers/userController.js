const { User } = require('../models')
const { genSalt, hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')

const getAllUser = async (req, res) => {
    try {
        const data = await User.findAll({
            attributes: ['id', 'username']
        })
         const result = {
            status: 'ok',
            data: data
        }
        res.json(result)
    } catch (error) {
        console.log(error, '<-- error get user')
    }
}

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const salt = await genSalt()
        const hastPassword = await hash(password, salt)

        const newUser = await User.create({
            username: username,
            password: hastPassword,
        })
        res.status(201).json({
            status: 'ok',
            data: {
                id: newUser.id,
                username: newUser.username,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        })
    } catch (error) {
        res.status(404)
        console.log(error, '<--- error create user')
    }
}

const loginUser = async (req, res) => {
    try {
        const username = await User.findAll({
            where: {
                username: req.body.username
            }
        })
        const checkPassword = await compare(req.body.password, username[0].password)
        if (!checkPassword) {
            return res.status(404).json({
                status: 'failed',
                message: 'password is wrong'
            })
        }
        const usernameId = username[0].id
        const usernameName = username[0].username

        const accessToken = sign({usernameId, usernameName}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })
        const refreshToken = sign({usernameId, usernameName}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        await User.update({ refresh_token: refreshToken }, {
            where: {
                id: usernameId
            }
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true
        })
        res.json({ accessToken })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: 'username is wrong'
        })
        console.log(error, '<-- error login user')
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

const logoutUser = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(204)
    const user = await User.findAll({
        where: {
            refresh_token: refreshToken
        }
    })
    if(!user[0]) return res.sendStatus(204)
    const userId = user[0].id
    await User.update({refresh_token: null}, {
        where: {
            id: userId
        }
    })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}


module.exports = { getAllUser, registerUser, deleteUser, loginUser, logoutUser }