const config = require('./config')
const env = process.env.NODE_ENV || 'dev'
const dbConfig = config.database[env]
console.log('dbConfig',dbConfig)

module.exports = dbConfig || config.database.dev
