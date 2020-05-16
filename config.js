const fs = require('fs')

module.exports = (() => {
  const filePath = (process.env.ENV_CONFIG_PATH || '.') + '/socialgamer-api.json'
  const content = fs.readFileSync(filePath, 'utf8')

  return JSON.parse(content)
})()
