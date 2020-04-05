const express = require('express');
const knex = require('../services/knex');

const router = express.Router();

router.get('/', function(req, res) {
  knex.from('user')
  .then(function(response) {
    res.json(response);
  });
});

router.post('/', function(req, res) {
  // insert
});

router.get('/:id', function(req, res) {
  knex.from('user').where('id', req.params.id)
  .then(function(response) {
    res.json(response);
  });
});

router.put('/:id', function(req, res) {
  // update
});

router.get('/:id/games', function(req, res) {
  // user games
});

router.get('/:id/consoles', function(req, res) {
  // user games
});

module.exports = router;
