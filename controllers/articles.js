const mongoose = require('mongoose');
const Article = require('../models/article');
const { httpStatusCode } = require('../utils/httpCodes');
const { BadReqError } = require('../errors/bad-req-err');
const { NotFoundError } = require('../errors/not-found-err');
const { AuthError } = require('../errors/auth-err');

const getArticles = (req, res, next) => {
  Article.find({}).sort({ createdAt: 'descending' })
    .then((articles) => {
      if (!articles) {
        throw new Error('Can\'t retrieve articles.');
      }
      return res.status(httpStatusCode.OK).send(articles);
    })
    .catch((err) => next(err));
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  if (!keyword || !title || !text || !date || !source || !link || !image) {
    throw new BadReqError('All fields must be filled in.');
  }
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      if (!article) {
        throw new Error('Can\'t create an article.');
      }
      return res.status(httpStatusCode.OK).send(article);
    })
    .catch((err) => next(err));
};

const deleteArticleById = (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Article.findByIdAndDelete(id)
      .then((article) => {
        if (!article) {
          throw new NotFoundError('No article with matching ID found.');
        }
        if (req.user._id !== String(article.owner)) {
          throw new AuthError('Not enough permission for this operation.');
        }
        return res.status(httpStatusCode.OK).send(article);
      })
      .catch((err) => next(err));
  } catch (e) {
    throw new BadReqError('Can\'t delete article. Wrong ID format.');
  }
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticleById,
};
