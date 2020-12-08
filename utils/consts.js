require('dotenv').config(); // production

const httpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  AUTH_ERROR: 401,
  FORBID_ERROR: 403,
  NOT_FOUND: 404,
  CONFLICT_ERROR: 409,
  SERVER_ERROR: 500,
};

const httpMessage = {
  OK: 'Ok',
  CREATED: 'Resource was successfully created.',
  BAD_REQUEST: 'Bad request.',
  AUTH_ERROR: 'Authentication error.',
  FORBID_ERROR: 'Requested resource is forbidden.',
  NOT_FOUND: 'Requested resource was not found.',
  CONFLICT_ERROR: 'Resource is already exist.',
  SERVER_ERROR: 'An error occurred on the server.',
};

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;
const JWT_KEY = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'some-secret-key';
const BASE_STR = process.env.NODE_ENV === 'production' ? process.env.BASE_STR : 'mongodb://localhost:27017/newsdb';
const HASH_NUM = 10;
const MONGOOSE_ID_LENGTH = 24;
const MIN_PASS_LENGTH = 8;

module.exports = {
  JWT_KEY,
  HASH_NUM,
  MONGOOSE_ID_LENGTH,
  MIN_PASS_LENGTH,
  BASE_STR,
  PORT,
  httpStatusCode,
  httpMessage,
};
