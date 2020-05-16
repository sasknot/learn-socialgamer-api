const notFound = (req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  err.url = req.originalUrl
  err.params = req.params
  err.body = req.body

  next(err)
}

module.exports = notFound
