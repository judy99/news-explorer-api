const { httpStatusCode } = require('../utils/consts');

module.exports = ((err, req, res, next) => {
  const { statusCode = httpStatusCode.SERVER_ERROR, message = 'An error occurred on the server' } = err;
  // if an error has no status, display 500
  res.status(httpStatusCode.SERVER_ERROR).send({ statusCode, message });
  next();
});
