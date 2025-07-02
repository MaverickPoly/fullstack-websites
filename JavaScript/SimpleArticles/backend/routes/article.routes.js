const express = require("express");

const {loginRequired} = require("../middleware/auth.middleware.js");
const {
    fetchAllArticles, createArticle, getArticle,
    updateArticle, deleteArticle
} = require("../controllers/article.controllers.js");


const router = express.Router();


router.get("/", loginRequired, fetchAllArticles);
router.post("/", loginRequired, createArticle);
router.get("/:articleId", loginRequired, getArticle);
router.put("/:articleId", loginRequired, updateArticle);
router.delete("/:articleId", loginRequired, deleteArticle);


module.exports = router;
