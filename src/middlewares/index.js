const {
  compression,
  json,
  urlencoded
} = require('./basics')
const graphql = require('./graphql')
const {
  routeNotFound,
  routeError
} = require('./route-handlers')

module.exports = {
  compression,
  json,
  urlencoded,
  graphql,
  routeNotFound,
  routeError
}
