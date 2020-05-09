const config = require('../config')
const knex = require('knex')
const bookshelf = require('bookshelf')

module.exports = bookshelf(knex(config.knex))
