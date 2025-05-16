import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";

import contactRoutes from "./routes/contactRoutes.js";
import { createTables } from "./lib/db.js";

const app = express();

// Constants
const PORT = process.env.PORT;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

// Routes
app.use("/api/contacts", contactRoutes);

// Setups
createTables();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
