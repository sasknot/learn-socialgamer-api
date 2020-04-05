const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.json([
    { id: 1, name: '123' },
    { id: 2, name: '345' }
  ]);
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

router.get('/:id/consoles', function(req, res) {
  // game consoles
});

module.exports = router;
