const fetch = require('unfetch')
const { HttpLink } = require('apollo-link-http')
const { ApolloLink } = require('apollo-link')
const { onError } = require('apollo-link-error')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { ApolloClient } = require('apollo-client')
const gql = require('graphql-tag')

const config = require('../config')
const API_URL =
  (process.env.API_BASE_URL || config.base_url || 'http://localhost')
  + ':'
  + (process.env.PORT || config.port_test || '8001')
  + '/graphql'

class ApolloClass {
  constructor (token) {
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
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      }

      if (networkError) console.error(`[Network error]: ${networkError}`)
    })

    this.client = new ApolloClient({
      link: ApolloLink.from([
        middlewareLink,
        handleErrors,
        new HttpLink({
          uri: API_URL,
          fetch
        })
      ]),
      cache: new InMemoryCache({
        addTypename: false
      })
    })
  }

  objectStringify (object) {
    if (typeof object !== 'object' || Array.isArray(object)) {
      return JSON.stringify(object)
    }

    const props = Object
      .keys(object)
      .map(key => `${key}:${this.objectStringify(object[key])}`)
      .join(',')
    return `{${props}}`
  }

  async query (options) {
    return this.request({
      ...options,
      method: 'query',
      type: 'query'
    })
  }

  async mutate (options) {
    return this.request({
      ...options,
      method: 'mutate',
      type: 'mutation'
    })
  }

  async request ({ name, input, fields, method, type }) {
    input = this.objectStringify(input)
    input = input.substring(1, input.length - 1)

    let string = `
      ${type} {
        ${name} (${input})
    `

    if (fields) {
      string += `{
        ${fields}
      }
      `
    }

    return this.client[method]({
      [type]: gql`${string}}`
    })
  }
}

module.exports = ApolloClass
