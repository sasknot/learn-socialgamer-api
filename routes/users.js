const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.json([
    { id: 1, username: 'oi', password: 'ola' },
    { id: 2, username: 'natan', password: 'natan2' },
    { id: 3, username: 'rafael', password: 'rafael2' }
  ]);
});

router.post('/', function(req, res) {
  // insert
});

router.get('/:id', function(req, res) {
  res.json({
    id: req.params.id
  })
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
