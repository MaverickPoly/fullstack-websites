import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const login = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: "All fields are required!"});
    }

    try {
        const user = await User.findOne({username: username});
        if (!user) {
            return res.status(400).json({message: "Invalid username!"});
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({message: "Invalid password!"});
        }

        const userPayload = {
            _id: user._id,
            username: user.username,
            email: user.email,
        }

        const accessToken = await jwt.sign(userPayload, JWT_SECRET, {
            expiresIn: "2d",
        });
        const refreshToken = await jwt.sign(userPayload, JWT_SECRET, {
            expiresIn: "14d",
        });

        res.cookie("accessToken", accessToken, {
            sameSite: "strict",
            httpOnly: true,
            secure: true,
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        });
        res.cookie("refreshToken", refreshToken, {
            sameSite: "strict",
            httpOnly: true,
            secure: true,
            maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
        });

        res.json({message: "Logged in successfully!"});
    } catch (error) {
        res.status(500).json({message: "Internal Server error!"});
    }
}

export const register = async (req, res) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({message: "All fields are required!"});
    }

    try {
        const usernameUser = await User.findOne({username: username});
        if (usernameUser) {
            return res.status(400).json({message: "Username already exists!"});
        }
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            return res.status(400).json({message: "Email already exists!"});
        }

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = User({username: username, email: email, password: hashedPassword});
        await user.save();

        res.status(201).json({message: "User created successfully!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server error!"});
    }
}

export const me = async (req, res) => {
    const userId = req.userId;

    console.log("Me User Id:")
    console.log(userId);

    try {
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (e) {
        res.status(500).json({message: "Internal Server error!"});
    }
}

export const logout = async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({message: "Logged out successfully!"});
}
