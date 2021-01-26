const { httpStatusCode } = require('../utils/consts');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpStatusCode.AUTH_ERROR;
  }
}
module.exports = { AuthError };
