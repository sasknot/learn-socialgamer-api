const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  knex.from('console')
  .then(function(response) {
    res.json(response);
  });
});

router.post('/', function(req, res) {
  // insert
  res.send('OK')
});

router.get('/:id', function(req, res) {
  // select by id
  res.send('OK')
});

router.put('/:id', function(req, res) {
  // update
  res.send('OK')
});

router.get('/:id/games', function(req, res) {
  // console games
  res.send('OK')
});

module.exports = router;
