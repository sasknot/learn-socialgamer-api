const express = require('express');
const knex = require('../services/knex');

const router = express.Router();

/**
 * @api {get} /users Get all users information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiSuccess {Object[]} Users
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "name": "John Doe",
 *         "email": "john.doe@email.com"
 *       },
 *       {
 *         "id": 2,
 *         "name": "John Doe 2",
 *         "email": "john.doe2@email.com"
 *       }
 *     ]
 */
router.get('/', function(req, res) {
  knex('user')
  .then(function(users) {
    res.json(users);
  });
});

// Insert new
router.post('/', function(req, res) {
  knex('user')
  .insert(req.body)
  .then(function(ids) {
    return knex('user').where('id', ids[0]);
  })
  .then(function(user) {
    res.json(user);
  });
});

// Get by id
router.get('/:id', function(req, res) {
  knex('user')
  .where('id', req.params.id)
  .then(function(user) {
    res.json(user);
  });
});

// Update by id
router.post('/:id', function(req, res) {
  knex('user')
  .where('id', req.params.id)
  .update(req.body)
  .then(function(id) {
    return knex('user').where('id', id);
  })
  .then(function(user) {
    res.json(user);
  });
});

// Get all games by user id
router.get('/:id/games', function(req, res) {
  knex('user_games')
  .where('user', req.params.id)
  .innerJoin('user', 'user.id', 'user_games.user')
  .innerJoin('game', 'game.id', 'user_games.game')
  .then(function(user) {
    res.json(user);
  });
});

// Get all consoles by user id
router.get('/:id/consoles', function(req, res) {
  knex('user_consoles')
  .where('user', req.params.id)
  .innerJoin('user', 'user.id', 'user_consoles.user')
  .innerJoin('console', 'console.id', 'user_consoles.console')
  .then(function(user) {
    res.json(user);
  });
});

module.exports = router;
