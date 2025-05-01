import express from "express";
import {login, logout, me, register} from "../controllers/auth.controller.js";
import {loginRequired} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", loginRequired, me);
router.get("/logout", loginRequired, logout);


export default router;
