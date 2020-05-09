const config = require('../config')
const knex = require('knex')
const bookshelf = require('bookshelf')

let knexConfig = config.database

if (process.env.NODE_ENV === 'test') {
  knexConfig = config.database_test
}

module.exports = bookshelf(knex(knexConfig))
