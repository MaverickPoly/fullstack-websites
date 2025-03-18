import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import productRouter from "./routes/product.route.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/products", productRouter)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening on  http://localhost:${PORT}`);
})