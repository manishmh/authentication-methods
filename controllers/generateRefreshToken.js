import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const generateRefreshToken = (username) => {
    const user = { name: username};

    const accessToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    return accessToken;
}

export default generateRefreshToken 