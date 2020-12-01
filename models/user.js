const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {
  AuthError,
} = require('../errors/auth-err');

const userSchema = new mongoose.Schema({
  // must be validate against to email schema
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    // minlength: 8,
    // in order to user's password hash won't be returned from the database by default
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Incorrect email or password');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Incorrect email or password');
          }
          return user;
        });
    })
    .catch((err) => next(err));
};

module.exports = mongoose.model('user', userSchema);
