const app = require('../src/app')

module.exports = async () => {
  await app.stop()

  return true
}
