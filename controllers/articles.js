const mongoose = require('mongoose');
const Article = require('../models/article');
const { httpStatusCode, httpMessage } = require('../utils/consts');
const { BadReqError } = require('../errors/bad-req-err');
const { NotFoundError } = require('../errors/not-found-err');
// const { PermissionError } = require('../errors/perm-err');

const getArticles = (req, res, next) => {
  // const {
  //   owner,
  // } = req.body;

  Article.find({ owner: mongoose.Types.ObjectId(req.params.userId) }).sort({ date: 'descending' })
    .then((articles) => {
      // console.log(articles);
      if (!articles) {
        throw new Error(); // database error => 500 Internal Server error
      }
      return res.status(httpStatusCode.OK).send(articles);
    })
    .catch((err) => next(err));
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image, owner,
  } = req.body;
  console.log('coming req.body: ', req.body);
  if (!keyword || !title || !text || !date || !source || !link || !image) {
    throw new BadReqError(httpMessage.BAD_REQUEST);
  }
  Article.create({
    keyword, title, text, date, source, link, image, owner: mongoose.Types.ObjectId(owner),
  })
    .then((article) => {
      if (!article) {
        throw new Error(); // database error => 500 Internal Server error
      }
      return res.status(httpStatusCode.CREATED).send(article);
    })
    .catch((err) => next(err));
};

const deleteArticleById = (req, res, next) => {
  const idToRemove = new mongoose.Types.ObjectId(req.params.articleId);
  Article.findById(idToRemove)
    .then((article) => {
      if (!article) {
        throw new NotFoundError(httpMessage.NOT_FOUND);
      }
      //
      // if (req.user._id !== article.owner.toString()) {
      //   throw new PermissionError(httpMessage.FORBID_ERROR);
      // }
      return article._id;
    })
    .then((id) => Article.findByIdAndDelete(mongoose.Types.ObjectId(id))
      .then((article) => res.status(httpStatusCode.OK).send(article)))
    .catch((err) => next(err));
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticleById,
};
