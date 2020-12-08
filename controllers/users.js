const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError } = require('../errors/not-found-err');
const { BadReqError } = require('../errors/bad-req-err');
const { AuthError } = require('../errors/auth-err');
const { ConflictError } = require('../errors/conflict-err');
const {
  JWT_KEY, HASH_NUM, httpStatusCode, MIN_PASS_LENGTH,
} = require('../utils/consts');

const getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id })
    .then((users) => {
      if (!users) {
        throw new NotFoundError('No user info found');
      }
      return res.status(httpStatusCode.OK).send(users);
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (password.trim().length < MIN_PASS_LENGTH) {
    throw new BadReqError('Password length should be at least 8.');
  }

  if (!email || !password) {
    throw new BadReqError('Email or password should not be empty.');
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('User with such email exists.');
      } else {
        bcrypt.hash(password, HASH_NUM)
          .then((hash) => User.create({
            name, email, password: hash,
          }))
          .then((newUser) => {
            if (!newUser) {
              throw new Error('Can\'t create user.');
            }
            const { _id: id } = newUser;
            return res.status(httpStatusCode.CREATED).send({ id, name, email });
          });
      }
    })
    .catch((err) => next(err));
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password, next)
    .then((user) => {
      if (!user) {
        throw new AuthError('Authentication error.Can\'t find user.');
      }
      // create a token
      const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
      res.status(httpStatusCode.OK).send({ token });
    })
    .catch((err) => next(err));
};

module.exports = {
  getUser,
  createUser,
  loginUser,
};
