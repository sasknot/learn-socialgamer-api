const path = require('path')
const express = require('express')
const { createServer } = require('http')

const config = require('../config')
const middlewares = require('./middlewares')
const sleep = require('./helpers/sleep')
const DEFAULT_PORT = ((val) => {
  const port = parseInt(val, 10)
  if (isNaN(port)) return val
  if (port >= 0) return port
  return false
})(process.env.PORT || config.port || 8000)

class App {
  expressInstance = null
  server = null

  constructor () {
    const app = express()

    // Index route
    app.get('/', function(req, res) {
      res.send('See at /graphql')
    })

    // Load all middlewares
    Object.values(middlewares).forEach((item) => {
      app.use(item)
    })

    this.expressInstance = app
  }

  async start (port = DEFAULT_PORT) {
    this.isRunning = true
    console.info('[APP] Starting...')
    await this.serve(port)

    // await sleep(1000)
    console.info('[APP] Started!')
  }

  async serve (port = DEFAULT_PORT) {
    const server = createServer(this.expressInstance)

    await new Promise((resolve, reject) => {
      server.listen(port, () => {
        const addr = server.address()
        const bind = typeof addr === 'string'
          ? `pipe ${addr}`
          : `port ${addr.port}`
        console.info(`[SERVER] http listening on ${bind}`)
        resolve()
      })
    })

    server.on('error', async (error) => {
      if (error.syscall !== 'listen') {
        throw error
      }

      var bind = typeof PORT === 'string'
        ? 'Pipe ' + PORT
        : 'Port ' + PORT

      // Handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES': {
          console.error(`[SERVER] ${bind} requires elevated privileges`)
          break
        }

        case 'EADDRINUSE': {
          console.error(`[SERVER] ${bind} is already in use`)
          break
        }
      }

      await this.stop()
      throw error
    })

    this.server = server
  }

  async stop () {
    console.info('[APP] Stopping...')

    await new Promise((resolve, reject) => {
      this.server.close(async (error) => {
        if (error) reject(error)

        resolve()
      })
    })

    // await sleep(1000)
    console.info('[APP] Stopped!')
  }
}

module.exports = new App()
