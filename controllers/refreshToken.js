const { User } = require('../models')
const { verify, sign } = require('jsonwebtoken')

const refreshToken = async (req, res) => {
    try {
        // console.log(req.cookies, '<-- request cookies')
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.sendStatus(401)
        const user = await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        })
        if(!user[0]) return res.sendStatus(403)
        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if(err) return res.sendStatus(403)
            const userId = user[0].id
            const userName = user[0].username
            const accessToken = sign({userId, userName}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            })
            res.json({ accessToken })
        })
    } catch (error) {
        res.sendStatus(403)
        // console.log(error)
    }
}

module.exports = { refreshToken }