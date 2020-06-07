const fetch = require('unfetch')
const { HttpLink } = require('apollo-link-http')
const { ApolloLink } = require('apollo-link')
const { onError } = require('apollo-link-error')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { ApolloClient } = require('apollo-client')
const gql = require('graphql-tag')

const database = require('../src/services/database')

class TestHelper {
  static properties = {
    user: ['id']
  }

  constructor (token) {
    this.apolloClient = this.gqlInit(token)
  }

  async syncDatabase () {
    await database.knex.migrate.latest()
    await database.knex.seed.run()
    await database.knex.seed.run({
      directory: './tests/fixtures'
    })
  }

  static objectStringify (object) {
    if (typeof object !== 'object' || Array.isArray(object)) {
      return JSON.stringify(object)
    }

    const props = Object
      .keys(object)
      .map(key => `${key}:${this.objectStringify(object[key])}`)
      .join(',')
    return `{${props}}`
  }

  static async gqlQuery (token, options) {
    options.query = gql`
      query {
        ${options.query}
      }
    `

    return this.gqlRequest(token, options, 'query')
  }

  static async gqlMutate (token, options) {
    options.mutation = gql`
      mutation {
        ${options.mutation}
      }
    `

    return this.gqlRequest(token, options, 'mutate')
  }

  static async gqlRequest (token, options, method = 'query') {
    const apollo = this.apolloClient || this.gqlInit(token)

    return apollo[method](options)
  }

  static gqlInit (token) {
    const middlewareLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: token
        }
      })
      return forward(operation)
    })
    const handleErrors = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      }

      if (networkError) console.log(`[Network error]: ${networkError}`)
    })

    return new ApolloClient({
      link: ApolloLink.from([
        middlewareLink,
        handleErrors,
        new HttpLink({
          uri: 'http://localhost:8000/graphql',
          fetch
        })
      ]),
      cache: new InMemoryCache({
        addTypename: false
      })
    })
  }
}

module.exports = TestHelper
