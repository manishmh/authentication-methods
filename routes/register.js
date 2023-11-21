import express from 'express';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../schemas/user.js';
import { userSchema } from '../schemas/dataValidation.js';
import logger from '../logger/index.js';

dotenv.config()

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        logger.info('register route accessed');

        // validating user data using yup
        await userSchema.validate(req.body, { abortEarly: false });
        const { email, password } = req.body;

        // finding user with email from database.
        const user = await User.findOne({ email });

        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                email,
                password: hashedPassword,
            });

            await newUser.save();
    
            res.status(201).json({ 
                status: 'success',
                message: "user created successfully",
            });
        } else {
            res.status(409).json({ 
                status: 'conflict',
                message: "user already exists",
            })
        }

    } catch (error) {
        console.error(error)
        res.status(400).json({ error: `${error}` });
    }
});



export default router;
