const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  knex('console')
  .then(function(consoles) {
    res.json(consoles);
  });
});

router.post('/', function(req, res) {
  knex('console')
  .insert(req.body)
  .then(function(ids) {
    return knex('console').where('id', ids[0]);
  })
  .then(function(console) {
    res.json(console);
  });
});

router.get('/:id', function(req, res) {
  knex('console')
  .where('id', req.params.id)
  .then(function(console) {
    res.json(console);
  });
});

router.put('/:id', function(req, res) {
  knex('console')
  .where('id', req.params.id)
  .update(req.body)
  .then(function(id) {
    return knex('console').where('id', id);
  })
  .then(function(console) {
    res.json(console);
  });
});

router.get('/:id/games', function(req, res) {
  knex('game_consoles')
  .where('console', req.params.id)
  .innerJoin('console', 'console.id', 'game_consoles.console')
  .innerJoin('game', 'game.id', 'game_consoles.game')
  .then(function(games) {
    res.json(games);
  });
});

module.exports = router;
