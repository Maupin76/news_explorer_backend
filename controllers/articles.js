const Article = require("../models/article");

const createArticle = async (req, res, next) => {
  try {
    const { keyword, title, text, date, source, link, image } = req.body;

    const article = await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: req.user._id,
    });

    return res.status(201).json(article);
  } catch (err) {
    return next(err);
  }
};

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    return res.json(articles);
  } catch (err) {
    return next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Article.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Article not found or not authorized" });
    }

    return res.json({ message: "Article deleted" });
  } catch (err) {
    return next(err);
  }
};
module.exports = { createArticle, getArticles, deleteArticle };
