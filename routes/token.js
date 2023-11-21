import express from 'express'
import User from '../schemas/user.js'
import Jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import generateAccessToken from '../controllers/generateAccessToken.js'

dotenv.config()

const router = express.Router()

router.get('/', (req, res) => {
    logger.info('token route accessed');
    const cookies = req.cookies

    if (!cookies?.jwt){
        return res.status(401).json({message: "No refresh Token"})
    }
    console.log('cookie', cookies)
    const refreshToken = cookies.jwt

    const foundUser = User.findOne({ refreshToken })

    if (!foundUser) {
        return res.status(403).json({ status: "failed",  message: "invalid refresh token"})
    }
    Jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ status: "failed",  message: "invalid refresh token"})
        }
        const userMail = { user: user.name.user }
        console.log('usermail', userMail)
        const accessToken = generateAccessToken(userMail)

        res.status(200).json({
            status: "success",
            user: user.name.user,
            data: {
                accessToken
            }
        })
    })
})

export default router