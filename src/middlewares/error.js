const error = (err, req, res, next) => {
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

module.exports = error
