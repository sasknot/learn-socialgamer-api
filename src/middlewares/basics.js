const express = require('express')
const compression = require('compression')

module.exports = {
  compression: compression(),
  json: express.json(),
  urlencoded: express.urlencoded({ extended: true })
}
