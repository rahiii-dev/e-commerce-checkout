import mongoose from "mongoose";
import { requireEnv } from "../utils/helper.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(requireEnv('MONGO_URI'), {
            dbName: process.env.DB_NAME || 'store',
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}