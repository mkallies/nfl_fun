const httpStatus = require('http-status')
const config = require('../config')

const handler = (err, req, res) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  }

  if (!config.isDev) {
    delete response.stack
  }

  return res.status(err.statusCode).json({ error: err.toString() })
}

module.exports = {
  handler,
}
