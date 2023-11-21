import express from 'express'
import * as dotenv from 'dotenv'
import generateAccessToken from '../controllers/generateAccessToken.js'
import generateRefreshToken from '../controllers/generateRefreshToken.js'
import { userSchema } from '../schemas/dataValidation.js'
import User from '../schemas/user.js'
import bcrypt from 'bcrypt'
import authenticateToken from '../controllers/authenticateToken.js'
import logger from '../logger/index.js'

// .env configuration
dotenv.config()
// defining router from express app
const router = express.Router()

router.route('/').get(authenticateToken, async (req, res) => {
    const email = req.user.name.user;
    const foundUser = await User.findOne({ email })

    if (!foundUser) {
        res.status(404).json({ message: 'User not found'})
    } else {
        res.status(200).json({ foundUser })
    }
})

router.route('/').post(async (req, res) => {
    try {
        logger.info('login route accessed')

        await userSchema.validate(req.body, { abortEarly: true})
        const { email } = req.body
        const userMail = { user: email }

        const user = await User.findOne({ email })
        
        if (!user) {
            res.status(404).json({ message: 'User not found'})
        } else {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const accessToken = generateAccessToken(userMail);
                const refreshToken = generateRefreshToken(userMail);

                user.refreshToken = refreshToken;
                await user.save();

                res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
                res.status(200).json({
                    status: "Success",
                    message: "User logged in successfully",
                    data: {
                        id: user.id,
                        email: user.email,
                        accessToken,
                    }
                })
            } else {
                res.status(401).json({ 
                    status: "failure",
                    message: "Wrong password"
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: `${error}`})
    }
})



export default router;
