const { httpStatusCode } = require('../utils/consts');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpStatusCode.CONFLICT_ERROR;
  }
}
module.exports = { ConflictError };
