const { httpStatusCode } = require('../utils/consts');

class PermissionError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpStatusCode.FORBID_ERROR;
  }
}
module.exports = { PermissionError };
