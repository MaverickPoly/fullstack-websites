import mongoose from "mongoose";


export const connectDB = async (MONGODB_URI) => {
    try {
        const res = await mongoose.connect(MONGODB_URI);
        console.log(`Connected to database at: ${res.connection.port}`);
    } catch (e) {
        console.error("Error connecting db!");
        process.exit(1);
    }
}
