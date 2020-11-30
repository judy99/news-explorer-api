const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors());

// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const articlesRoute = require('./routes/articles');
const usersRoute = require('./routes/users');

console.log('********* server has started *********');

app.use(usersRoute);
app.use(articlesRoute);
app.use(errorLogger);

app.use(errors()); // celebrate error handler
app.use(error); // centralized error handler

const {
  PORT = 3000,
} = process.env;

app.listen(PORT);
