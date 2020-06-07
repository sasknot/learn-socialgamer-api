const _ = require('lodash')
const { UserModel } = require('../models/user')
const { AuthenticationError, EmptyResponseOutput } = require('../errors')

const requestUtils = {
  requireAuth (context) {
    if (!context.user && !context.token) {
      throw new AuthenticationError
    }

    return true
  },

  getParams (params) {
    const output = {}

    for (const [key, value] of Object.entries(params)) {
      if (
        value !== null
        && value !== undefined
        && value !== {}
        && value !== []
        && value !== ''
      ) {
        output[key] = value
      }
    }

    return output
  },

  getId (params) {
    const id = +params.id || null

    if (!id) throw new Error('Empty id')
    if (isNaN(id)) throw new Error('NaN id')

    return id
  },

  mustReturn (output) {
    if (_.isEmpty(output)) {
      throw new EmptyResponseOutput('Request must return an output')
    }

    return output
  }
}

module.exports = requestUtils
