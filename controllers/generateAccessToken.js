import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const generateAccessToken = (username) => {
    const user = { name: username};

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });

    return accessToken;
}

export default generateAccessToken 