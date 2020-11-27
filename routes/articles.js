const { celebrate, Joi } = require('celebrate');
const cards = require('express').Router();
const {
  getArticles, createArticle, deleteArticleById,
} = require('../controllers/cards.js');
const auth = require('../middlewares/auth.js');

cards.get('/articles', auth, getArticles);

cards.post('/articles', auth, celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    link: Joi.string().required().pattern(/^(http:\/\/|https:\/\/)(w{3}\.)?([\w\-\/\(\):;,\?]+\.{1}?[\w\-\/\(\):;,\?]+)+#?$/),
    image: Joi.string().required().pattern(/^(http:\/\/|https:\/\/)(w{3}\.)?([\w\-\/\(\):;,\?]+\.{1}?[\w\-\/\(\):;,\?]+)+#?$/),
  }),
}),
createArticle);

cards.delete('/articles/articleId', auth, deleteArticleById);

module.exports = articles;
