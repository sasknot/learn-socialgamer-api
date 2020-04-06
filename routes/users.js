const express = require('express');
const knex = require('../services/knex');

const router = express.Router();

/**
 * @api {get} /users Get all
 * @apiGroup User
 *
 * @apiSuccessExample Response
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "avatar": null,
 *         "name": "John Doe",
 *         "email": "john.doe@email.com",
 *         "password": "123",
 *         "birthday": "1990-01-01",
 *         "location": "California",
 *         "description": "Hi, I'm John Doe! Nice to meet you",
 *         "created_at": "2020-04-03 14:00:00",
 *         "updated_at": "2020-04-03 14:00:00",
 *       },
 *       {
 *         "id": 2,
 *         "avatar": null,
 *         "name": "Monty Python",
 *         "email": "monty.python@email.com",
 *         "password": "123",
 *         "birthday": "1994-01-01",
 *         "location": "Texas",
 *         "description": "Hello there",
 *         "created_at": "2020-04-04 10:00:00",
 *         "updated_at": "2020-04-04 10:00:00",
 *       }
 *     ]
 */
router.get('/', function(req, res) {
  knex('user')
  .then(function(users) {
    res.json(users);
  });
});

/**
 * @api {post} /users Insert multiple
 * @apiGroup User
 * @apiParam (Request Body) {json} User User fields (not all fields are mandatory)
 * @apiParamExample {json} Example
 *    {
 *      "name": "Karen Eliot",
 *      "email": "karen.eliot@email.com",
 *      "password": "123",
 *      "birthday": "1996-01-01",
 *      "location": "NY",
 *    }
 *
 * @apiSuccessExample Response
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 3,
 *       "avatar": null,
 *       "name": "Karen Eliot",
 *       "email": "karen.eliot@email.com",
 *       "password": "123",
 *       "birthday": "1996-01-01",
 *       "location": "NY",
 *       "description": null,
 *       "created_at": "2020-04-06 18:00:00",
 *       "updated_at": "2020-04-06 18:00:00",
 *     }
 */
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

/**
 * @api {get} /users/:id Get a single
 * @apiGroup User
 * @apiParam {Number} id User unique ID
 *
 * @apiSuccessExample Response
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 3,
 *       "avatar": null,
 *       "name": "Karen Eliot",
 *       "email": "karen.eliot@email.com",
 *       "password": "123",
 *       "birthday": "1996-01-01",
 *       "location": "NY",
 *       "description": null,
 *       "created_at": "2020-04-06 18:00:00",
 *       "updated_at": "2020-04-06 18:00:00",
 *     }
 */
router.get('/:id', function(req, res) {
  knex('user')
  .where('id', req.params.id)
  .then(function(user) {
    res.json(user);
  });
});

/**
 * @api {post} /users/:id Update a single
 * @apiGroup User
 * @apiParam {Number} id User unique ID
 * @apiParam (Request Body) {json} User User fields (not all fields are mandatory)
 * @apiParamExample {json} Example
 *    {
 *      "name": "Netochka Nezvanova",
 *      "email": "netochka.nezvanova@email.com",
 *    }
 *
 * @apiSuccessExample Response
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 3,
 *       "avatar": null,
 *       "name": "Netochka Nezvanova",
 *       "email": "netochka.nezvanova@email.com",
 *       "password": "123",
 *       "birthday": "1996-01-01",
 *       "location": "NY",
 *       "description": null,
 *       "created_at": "2020-04-06 18:00:00",
 *       "updated_at": "2020-04-06 18:00:00",
 *     }
 */
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

/**
 * @api {delete} /users/:id Delete a single
 * @apiGroup User
 * @apiParam {Number} id User unique ID
 *
 * @apiSuccessExample Response
 *     HTTP/1.1 200 OK
 *     [
 *       3
 *     ]
 */
router.delete('/:id', function(req, res) {
  knex('user')
  .where('id', req.params.id)
  .delete()
  .then(function(id) {
    res.json(id);
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
