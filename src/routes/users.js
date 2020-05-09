const express = require('express');
const { UserModel, UserCollection } = require('../models/user');

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
router.get('/', async function(req, res) {
  const result = await UserCollection.findWithPaging({ page: 1, pageSize: 10 })
  const output = result.outputWithPaging()

  res.json(output)
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
router.get('/:id', async function(req, res) {
  const result = await UserModel.find({ id: req.params.id })
  const output = result.output()

  res.json(output)
});

/**
 * @api {post} /users Insert a single
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
router.post('/', async function(req, res) {
  const result = await UserModel.forge().save(req.body)
  const output = result.output()

  res.json(output)
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
router.post('/:id', async function(req, res) {
  const result = await UserModel.forge({ id: req.params.id }).save(req.body)
  const output = result.output()

  res.json(output)
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
router.delete('/:id', async function(req, res) {
  const result = await UserModel.forge({ id: req.params.id }).destroy()
  const output = result.output()

  res.json(output)
});

module.exports = router;
