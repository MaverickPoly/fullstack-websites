import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        await mongoose.connect(MONGODB_URI);
        console.log(`Connected to db at ${MONGODB_URI}`);
    } catch (error) {
        console.error(`Error connecting db: ${error}`);
        process.exit(1);
    }
};
