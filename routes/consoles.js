const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  // select
});

router.post('/', function(req, res) {
  // insert
});

router.get('/:id', function(req, res) {
  // select by id
});

router.put('/:id', function(req, res) {
  // update
});

router.get('/:id/games', function(req, res) {
  // console games
});

module.exports = router;
