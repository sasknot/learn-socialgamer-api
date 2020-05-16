const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server')

const InternalError = (message) => {
  const output = new Error(message)
  output.name = 'InternalError'

  return output
}

module.exports = {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
  InternalError
}
