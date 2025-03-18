import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import notesRoute from "./routes/note.route.js";
import bodyParser from "body-parser";
import cors from 'cors';
import { connectDB } from "./db/connectDB.js";


const app = express();

// Config
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors());

// Contstants
const PORT = process.env.PORT;

// Routes
app.use("/api/auth", authRoute);
app.use("/api/notes", notesRoute);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening on http://localhost:${PORT}`);
});
