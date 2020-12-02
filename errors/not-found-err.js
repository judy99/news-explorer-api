const { httpStatusCode } = require('../utils/consts');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpStatusCode.NOT_FOUND;
  }
}
module.exports = { NotFoundError };
