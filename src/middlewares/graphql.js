const path = require('path');
const { loadFiles } = require('@graphql-toolkit/file-loading')
const { ApolloServer } = require('apollo-server-express')

const typeDefs = loadFiles(path.join(__dirname, '..', 'schemas', '**/*.graphql'))
const resolvers = loadFiles(path.join(__dirname, '..', 'resolvers', '**/*.js'))
const context = ({ req }) => {
  const output = { req }

  // if (req.query.locale) {
  // }
  // if (req.headers.authorization) {
  // }

  return output
}

const graphQLServer = new ApolloServer({
  typeDefs,
  resolvers,
  context
})

module.exports = graphQLServer.getMiddleware()
