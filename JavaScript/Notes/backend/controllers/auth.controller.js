import { UserModel } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

// Register new user
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const usernameUser = await UserModel.findOne({ username: username });
        if (usernameUser) {
            return res.status(400).json({ message: "Username already exists!" });
        }

        const emailUser = await UserModel.findOne({ email: email });
        if (emailUser) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new UserModel({ username: username, email: email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!", data: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


// Login existing user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: "All fields are required!" });
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email!" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password!" });
        }

        // Access Token
        const userPayload = {
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            notes: user.notes,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
        const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "1h" });

        // Refresh Token
        const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET + user.password, { expiresIn: "7d" });

        res.json({
            message: "Login successful",
            user: user,
            token,
            refreshToken,
            expiresIn: 3600 // 1 hour in seconds: 60 * 60
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Refresh the access token given refresh token
export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token is required!" });
    }

    try {
        // Decoding token to get the user ID
        const decoded = jwt.decode(refreshToken);
        if (!decoded) {
            return res.status(403).json({ message: "Invalid refresh token!" });
        }

        // Find the user with decoded id
        const user = UserModel.findById(decoded.id);
        if (!user) {
            return res.status(403).json({ message: "User not found!" });
        }

        // Refreshes the Refresh Token
        jwt.verify(refreshToken, JWT_SECRET + user.password);

        // Generating new access token
        const newToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
        console.log("=================== REFRESHED TOKEN =================")
        res.json({
            token: newToken, expiresIn: 3600, // 1 hour
        });
    } catch (error) {
        res.status(403).json({ message: "Invalid refresh token!" });
    }
}
