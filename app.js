const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); // production
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const { limiter } = require('./middlewares/limits'); // production
const { BASE_STR, PORT } = require('./utils/consts');

const app = express();
app.use(cors());
// app.use(helmet());
// app.set('trust proxy', 1);
// app.use(limiter);

// connect to the MongoDB server
mongoose.connect(BASE_STR, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);
app.use(requestLogger);
app.use(errorLogger);

app.use(errors()); // celebrate error handler
app.use(error); // centralized error handler

app.listen(PORT);
