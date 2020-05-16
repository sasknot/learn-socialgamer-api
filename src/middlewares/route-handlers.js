const routeHandlers = {
  routeNotFound (req, res, next) {
    let err = new Error('Not Found')
    err.status = 404
    err.url = req.originalUrl
    err.params = req.params
    err.body = req.body

    next(err)
  },

  routeError (err, req, res, next) {
    let output = {
      message: err.message,
      status: err.status
    }
    const env = process.env.NODE_ENV

    // In development, print stack trace
    if (env === 'development') {
      output.stack = err
    }

    res
    .status(err.status || 500)
    .json(output)
  }
}

module.exports = routeHandlers
