
import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './models/db.js'
import logger from './logger/index.js'
import cookieParser from 'cookie-parser'

// route imports
import loginRouter from './routes/login.js'
import registerRouter from './routes/register.js'
import tokenRouter from './routes/token.js'
import logoutRouter from './routes/logout.js'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const app = express()
connectDB();

// Middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json({ limit: '50mb'}))
app.use(express.urlencoded({ extended: true }))

// routes middleware
app.use('/login', loginRouter);
app.use('/register', registerRouter)
app.use('/token', tokenRouter)
app.use('/logout', logoutRouter)


// root route 
app.get('/', (req, res) => {
    logger.info('root page accessed')
    res.status(200).json({ message: "Hello from the Home Page"})
})

app.listen(8080, () => console.log("port started on http://localhost:8080"))