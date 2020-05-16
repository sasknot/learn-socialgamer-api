const path = require('path');
const express = require('express');

const app = express();
const middlewares = require('./middlewares')

// Index route
app.get('/', function(req, res) {
  res.send('OK')
})

// Middlewares
Object.values(middlewares).forEach((item) => {
  app.use(item)
})

module.exports = app
