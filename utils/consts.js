const httpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  AUTH_ERROR: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};
const JWT_KEY = 'some-secret-key';
const HASH_NUM = 10;

module.exports = {
  JWT_KEY, HASH_NUM, httpStatusCode,
};
