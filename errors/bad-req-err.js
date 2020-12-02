const { httpStatusCode } = require('../utils/consts');

class BadReqError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpStatusCode.BAD_REQUEST;
  }
}
module.exports = { BadReqError };
