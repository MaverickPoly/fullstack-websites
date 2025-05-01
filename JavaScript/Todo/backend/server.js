import express from "express"
import dotenv from "dotenv";
import {connectDB} from "./lib/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";


// App
const app = express();

dotenv.config();


// Constants
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {origin: "http://localhost:3000", credentials: true},
));


// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todos", todoRoutes);

connectDB(MONGODB_URI);


app.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost:${PORT}`);
});
