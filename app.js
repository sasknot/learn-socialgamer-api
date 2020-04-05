const path = require('path');
const express = require('express');

const app = express();

// Routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

module.exports = app
