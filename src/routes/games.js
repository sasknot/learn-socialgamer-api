const express = require('express');
const { GameModel, GameCollection } = require('../models/game');

const router = express.Router();

router.get('/', async function(req, res) {
  const result = await GameCollection.findWithPaging({ page: 1, pageSize: 10 })
  const output = result.outputWithPaging()

  res.json(output)
});

router.get('/:id', async function(req, res) {
  const result = await GameModel.find({ id: req.params.id })
  const output = result.output()

  res.json(output)
});

router.post('/', async function(req, res) {
  const result = await GameModel.forge().save(req.body)
  const output = result.output()

  res.json(output)
});

router.post('/:id', async function(req, res) {
  const result = await GameModel.forge({ id: req.params.id }).save(req.body)
  const output = result.output()

  res.json(output)
});

router.delete('/:id', async function(req, res) {
  const result = await GameModel.forge({ id: req.params.id }).destroy()
  const output = result.output()

  res.json(output)
});

module.exports = router;
