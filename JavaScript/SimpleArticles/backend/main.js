const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { connectDB } = require("./util/db.js");
const authRoutes = require("./routes/auth.routes.js");
const articleRoutes = require("./routes/article.routes.js");

dotenv.config();

// Constants
const PORT = process.env.PORT;
const MONGODB_DATABASE_URI = process.env.MONGODB_DATABASE_URI;

const app = express();
connectDB(MONGODB_DATABASE_URI);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

// Routes
app.use("/auth", authRoutes);
app.use("/articles", articleRoutes);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
