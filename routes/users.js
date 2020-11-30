const { celebrate, Joi } = require('celebrate');
const users = require('express').Router();

const {
  getUser,
  createUser,
  loginUser,
} = require('../controllers/users.js');
const auth = require('../middlewares/auth.js');

users.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2),
  }),
}), createUser);

users.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), loginUser);

users.get('/users/me', auth, getUser);
// users.get('/users/me', getUser);

module.exports = users;
