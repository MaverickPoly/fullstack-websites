const mongoose = require("mongoose");

const { ArticleModel } = require("../models/article.model.js");
const { UserModel } = require("../models/user.model");

const fetchAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find().populate("userId");
    res.json({ message: "Fetched all articles successfully!", data: articles });
  } catch (e) {
    console.error(`Error fetching All Articles: ${e}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createArticle = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: "Some fields are missing!" });
    }
    const userId = req.userId;

    const article = ArticleModel({
      title,
      content,
      userId,
      category,
    });
    await article.save();
    const user = await UserModel.findById(userId);
    user.articles.push(article._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Article created successfully!", data: article });
  } catch (e) {
    console.error(`Error creating article: ${e}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getArticle = async (req, res) => {
  try {
    const { articleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
      return res.status(400).json({ message: "Invalid article id!" });
    }

    const article = await ArticleModel.findById(articleId).select("-password");

    if (!article) {
      return res.status(404).json({ message: "Article not found!" });
    }
    res.json({
      message: `Article with id ${articleId} fetched successfully!`,
      data: article,
    });
  } catch (e) {
    console.error(`Error fetching an article: ${e}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { title, content, category } = req.body;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
      return res.status(400).json({ message: "Invalid article id!" });
    }

    const article = await ArticleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found!" });
    }
    if (article.userId !== userId) {
      return res
        .status(400)
        .json({ message: "You cannot update this article!" });
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;
    if (category) updateFields.category = category;

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      { $set: updateFields },
      { new: true },
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found!" });
    }

    res.json({
      message: "Updated article successfully!",
      data: updatedArticle,
    });
  } catch (e) {
    console.error(`Error updating an article: ${e}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
      return res.status(400).json({ message: "Invalid article id!" });
    }

    const article = await ArticleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found!" });
    }

    if (article.userId.toString() !== userId) {
      return res.status(400).json({ message: "You do not own this article!" });
    }

    const deletedArticle = await ArticleModel.findByIdAndDelete(articleId);

    res.json({
      message: "Article deleted successfully!",
      data: deletedArticle,
    });
  } catch (e) {
    console.error(`Error deleting an article: ${e}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  fetchAllArticles,
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
};
