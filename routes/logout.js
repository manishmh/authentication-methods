import express from 'express'
import User from '../schemas/user.js'

const router = express.Router()

router.delete('/', async (req, res) => {
    logger.info('logout route accessed');

    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({message: "No refresh Token"})
    }

    console.log(cookies)

    const refreshToken = cookies.jwt
    console.log(refreshToken)
    try {
        const result = await User.updateOne({ refreshToken: refreshToken }, { $set: { refreshToken: '' } });
        console.log(result)
        if (result.nModified > 0) {
            return res.status(404).json({ message: "User not found"})
        } else {
            console.log('RefreshToken removed successfully');
            res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            return res.status(200).json({ message: "RefreshToken removed successfully" })
        }
    } catch (error) {
        console.error('Error removing refreshToken:', error);
        return res.status(500).json({ message: "Error removing refreshToken"})
    }
})

export default router