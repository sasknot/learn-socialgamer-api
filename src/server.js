const express = require('express')
const app = require('./app')

try {
  app.start()
} catch (error) {
  console.error(error)
  process.exit(1)
}

process.send('ready')

process.on('SIGINT', async function () {
  console.info('[SERVER] SIGINT signal received')

  try {
    await app.stop()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})
