import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to mongodb');
    } catch (error) {
        console.error('MongoDB connection error', error) 
    }
}

export default connectDB