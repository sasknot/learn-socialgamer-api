const {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} = require('apollo-server')

class InternalError extends Error {
  constructor (message) {
    super(message)
    this.name = 'InternalError'
  }
}

class NotFoundError extends Error {
  constructor (message) {
    super(message)
    this.name = 'NotFoundError'
  }
}

class EmptyResponseOutput extends Error {
  constructor (message) {
    super(message)
    this.name = 'EmptyResponseOutput'
  }
}

module.exports = {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
  InternalError,
  NotFoundError,
  EmptyResponseOutput
}
