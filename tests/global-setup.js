const config = require('../config')
const app = require('../src/app')

module.exports = async () => {
  const port = process.env.PORT || config.port_test || 8001

  await app.start(port)

  return true
}
