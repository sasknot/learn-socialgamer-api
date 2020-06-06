const path = require('path')
const express = require('express')

const middlewares = require('./middlewares')
const sleep = require('./helpers/sleep')
const app = express()

// Index route
app.get('/', function(req, res) {
  res.send('See at /graphql')
})

// Middlewares
Object.values(middlewares).forEach((item) => {
  app.use(item)
})

// Start
app.start = async () => {
  console.log('[APP] Starting...')
  await sleep(2000)
  console.log('[APP] Started!')
  return true
}

// Stop
app.stop = async () => {
  console.log('[APP] Stopping...')
  await sleep(2000)
  console.log('[APP] Stopped!')
  return true
}

module.exports = app
