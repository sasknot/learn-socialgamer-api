const config = require('./config');
const routes = require('./routes');

const path = require('path');
const express = require('express');
const knex = require('knex')(config.knex)

const app = express();

// Routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

Object.keys(routes).forEach(function(routeName) {
  app.use('/' + routeName, routes[routeName])
});

// If no route was found, sends 404 to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  err.url = req.originalUrl;
  err.params = req.params;

  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  let output = {
    message: err.message,
    status: err.status
  };

  // In development, print stack trace
  if (app.get('env') === 'development') {
    output.stack = err;
  }

  res
  .status(err.status || 500)
  .json(output);
});

module.exports = app
