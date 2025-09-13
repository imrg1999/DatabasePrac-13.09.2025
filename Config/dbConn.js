import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async() => {
    try{
        const connMN = await mongoose.connect(process.env.mongoURI);
    console.log("DB connected successfully");
    } catch(error) {
        console.log(error.message);
        process.exit(1);
    }
} 