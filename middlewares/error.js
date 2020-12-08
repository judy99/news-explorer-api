const { httpStatusCode } = require('../utils/consts');

module.exports = ((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = httpStatusCode.SERVER_ERROR, message = 'An error occurred on the server' } = err;
  res.status(err.statusCode).send({ statusCode, message });
  next();
});
