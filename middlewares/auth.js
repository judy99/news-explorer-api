const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/auth-err');
const { JWT_KEY, httpMessage } = require('../utils/consts');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    // 'Token not provided or provided in the wrong format'
    throw new AuthError(httpMessage.AUTH_ERROR);
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, JWT_KEY, (err, payload) => {
    if (err) {
      // 'The provided token is invalid.'
      throw new AuthError(httpMessage.AUTH_ERROR);
    } else {
      req.user = payload;
    }
  });
  next();
};
