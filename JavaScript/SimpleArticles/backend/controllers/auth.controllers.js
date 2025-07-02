const express = require("express");
const mongoose = require("mongoose");
const { UserModel } = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Some fields are missing!" });
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    const userPayload = {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      articles: user.articles,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    const accessToken = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("accessToken", accessToken, {
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.cookie("refreshToken", refreshToken, {
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      message: "Login successful!",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (e) {
    console.error(`Error logging in: ${e}`);
    res
      .status(500)
      .json({ message: "Internal server error!", error: e.message });
  }
};

const handleRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Some fields are missing!" });
    }

    const usernameUser = await UserModel.findOne({ username: username });
    if (usernameUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    const emailUser = await UserModel.findOne({ email: email });
    if (emailUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = UserModel({
      username: username,
      email: email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (e) {
    console.error(`Error registering: ${e}`);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const handleLogout = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully!" });
};

const fetchMe = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId)
      .select("-password")
      .populate("articles");
    res.json({ data: user, message: "Fetched profile successfully!" });
  } catch (e) {
    console.error(`Error fetching 'me' profile: ${e}`);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id!" });
    }

    const user = await UserModel.findById(userId)
      .select("-password")
      .populate("articles");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json({ data: user, message: "Fetched profile successfully!" });
  } catch (e) {
    console.error(`Error fetching user profile: ${e}`);
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = {
  handleLogin,
  handleRegister,
  handleLogout,
  fetchMe,
  getUser,
};
