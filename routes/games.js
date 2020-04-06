const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  knex('game')
  .then(function(games) {
    res.json(games);
  });
});

router.post('/', function(req, res) {
  knex('game')
  .insert(req.body)
  .then(function(ids) {
    return knex('game').where('id', ids[0]);
  })
  .then(function(game) {
    res.json(game);
  });
});

router.get('/:id', function(req, res) {
  knex('game')
  .where('id', req.params.id)
  .then(function(game) {
    res.json(game);
  });
});

router.put('/:id', function(req, res) {
  knex('game')
  .where('id', req.params.id)
  .update(req.body)
  .then(function(id) {
    return knex('game').where('id', id);
  })
  .then(function(game) {
    res.json(game);
  });
});

router.get('/:id/consoles', function(req, res) {
  knex('game_consoles')
  .where('game', req.params.id)
  .innerJoin('game', 'game.id', 'game_consoles.game')
  .innerJoin('console', 'console.id', 'game_consoles.console')
  .then(function(consoles) {
    res.json(consoles);
  });
});

module.exports = router;
