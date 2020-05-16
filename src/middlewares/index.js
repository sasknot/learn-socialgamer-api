const { compression, json, urlencoded } = require('./basics')
const graphql = require('./graphql')
const notFound = require('./not-found')
const error = require('./error')

module.exports = {
  compression,
  json,
  urlencoded,
  graphql,
  notFound,
  error
}
