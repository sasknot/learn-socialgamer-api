const { UserModel } = require('../models/user')
const { AuthenticationError } = require('../errors')

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
    return id
  }
}

module.exports = requestUtils
