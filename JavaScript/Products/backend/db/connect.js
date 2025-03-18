import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const DATABASE_URI = process.env.DATABASE_URI;
        console.log(DATABASE_URI);
        await mongoose.connect(DATABASE_URI)
        console.log("Connected to database successfully!")
    } catch (error) {
        console.error(`Error connecting to a database: ${error.message}`)
        process.exit(1);
    }
}