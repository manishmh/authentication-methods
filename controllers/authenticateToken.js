import Jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'

dotenv.config()

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader
    
    if (token == null) {
        return res.status(401).json({ message: 'No token received'})
    }

    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Unauthorized Token" })
        }
        req.user = user
        next()
    }) 
}

export default authenticateToken