const config = require('./config');

const path = require('path');
const express = require('express');
const knex = require('knex')(config.knex)

const app = express();

// Routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

module.exports = app
