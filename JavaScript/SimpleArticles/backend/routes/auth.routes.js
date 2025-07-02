const express = require("express");

const {
    handleLogin, handleRegister, handleLogout, fetchMe, getUser
} = require("../controllers/auth.controllers.js");
const {loginRequired} = require("../middleware/auth.middleware.js");

const router = express.Router();


router.post("/login", handleLogin);
router.post("/register", handleRegister);
router.get("/logout", loginRequired, handleLogout);
router.get("/me", loginRequired, fetchMe);
router.get("/users/:userId", loginRequired, getUser);


module.exports = router;