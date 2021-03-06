const { celebrate, Joi } = require('celebrate');
const articles = require('express').Router();
const auth = require('../middlewares/auth.js');
const {
  getArticles,
  createArticle,
  deleteArticleById,
} = require('../controllers/articles.js');
const { MONGOOSE_ID_LENGTH } = require('../utils/consts');

articles.get('/articles', auth, getArticles);

articles.post('/articles', auth, celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required().pattern(/^(http:\/\/|https:\/\/)(w{3}\.)?([\w\-\/\(\):;,\?]+\.{1}?[\w\-\/\(\):;,\?]+)+#?$/),
    link: Joi.string().required().pattern(/^(http:\/\/|https:\/\/)(w{3}\.)?([\w\-\/\(\):;,\?]+\.{1}?[\w\-\/\(\):;,\?]+)+#?$/),
    image: Joi.string().required().pattern(/^(http:\/\/|https:\/\/)(w{3}\.)?([\w\-\/\(\):;,\?]+\.{1}?[\w\-\/\(\):;,\?]+)+#?$/),
  }),
}),
createArticle);

articles.delete('/articles/:articleId', auth, celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(MONGOOSE_ID_LENGTH),
  }),
}), deleteArticleById);

module.exports = articles;
