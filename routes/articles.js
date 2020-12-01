const { celebrate, Joi } = require('celebrate');
const articles = require('express').Router();
const {
  getArticles, createArticle, deleteArticleById,
} = require('../controllers/articles.js');
const auth = require('../middlewares/auth.js');

articles.get('/articles', auth, getArticles);

articles.post('/articles', auth, celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(/^(http:\/\/|https:\/\/)(w{3}\.)?([\w\-\/\(\):;,\?]+\.{1}?[\w\-\/\(\):;,\?]+)+#?$/),
    image: Joi.string().required().pattern(/^(http:\/\/|https:\/\/)(w{3}\.)?([\w\-\/\(\):;,\?]+\.{1}?[\w\-\/\(\):;,\?]+)+#?$/),
  }),
}),
createArticle);

articles.delete('/articles/:articleId', auth, deleteArticleById);

module.exports = articles;
