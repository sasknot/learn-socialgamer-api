const { createServer } = require('http')
const express = require('express')
const app = require('./app')

const PORT = ((val) => {
  const port = parseInt(val, 10)
  if (isNaN(port)) return val
  if (port >= 0) return port
  return false
})(process.env.PORT || 8000)
const server = createServer(app)

server.listen(PORT, async function () {
  await app.start()

  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`
  console.log(`[SERVER] http listening on ${bind}`)
  process.send('ready')
})

server.on('error', function (error) {
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
      process.exit(1)
      break
    }

    case 'EADDRINUSE': {
      console.error(`[SERVER] ${bind} is already in use`)
      process.exit(1)
      break
    }

    default: {
      throw error
    }
  }
})

process.on('SIGINT', function () {
  console.log('[SERVER] SIGINT signal received')

  try {
    server.close(async (error) => {
      if (error) throw error

      await app.stop()
      process.exit(0)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})
