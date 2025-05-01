import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const loginRequired = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({message: "Not authenticated!"});
    }

    try {
        const verified = jwt.verify(accessToken, JWT_SECRET);
        req.userId = verified._id;
        next();
    } catch (e) {
        res.status(400).json({message: "Invalid Access Token!"});
    }
}