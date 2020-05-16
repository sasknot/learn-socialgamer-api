const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config')

const token = {
  encode (data, options = {}) {
    const tokenOptions = Object.assign({
      expiresIn: '1y'
    }, options)

    return jwt.sign(data, jwtSecret, tokenOptions)
  },

  decode (token, options = {}) {
    const tokenOptions = Object.assign({}, options)

    return jwt.verify(token, jwtSecret, tokenOptions)
  }
}

module.exports = token
