const { celebrate, Joi } = require('celebrate');
const articles = require('express').Router();
// const auth = require('../middlewares/auth.js');
const {
  getArticles,
  createArticle,
  deleteArticleById,
} = require('../controllers/articles.js');
const { MONGOOSE_ID_LENGTH } = require('../utils/consts');

// articles.get('/articles', auth, getArticles);
articles.get('/articles/:userId', getArticles);

// articles.post('/articles', auth, celebrate({
articles.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
    owner: Joi.string().required(),
  }),
}),
createArticle);

// articles.delete('/articles/:articleId', auth, celebrate({
articles.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(MONGOOSE_ID_LENGTH),
  }),
}), deleteArticleById);

module.exports = articles;
