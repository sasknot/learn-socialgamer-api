const routes = require('./routes');

const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', function(req, res) {
  res.send('OK');;
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
  err.body = req.body;

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
