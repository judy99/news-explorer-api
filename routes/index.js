const routes = require('express').Router();
const articlesRoute = require('./articles');
const usersRoute = require('./users');

routes.use(usersRoute);
routes.use(articlesRoute);

module.exports = routes;
