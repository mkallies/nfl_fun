// /* eslint-disable no-process-exit */
// const express = require('express')
// const logger = require('./loaders/logger')
// const config = require('./config')

// async function initServer() {
//   const app = express()

//   await require('./loaders')({ expressApp: app, express })

//   app.listen(config.port, (err) => {
//     if (err) {
//       logger.error(err)
//       process.exit(1)
//     }

//     logger.info('Listening on PORT: %s', config.port)
//   })

//   process.on('unhandledRejection', async (reason, promise) => {
//     logger.error('Unhandled rejection at', promise, ` reason: ${reason}`)
//     process.exit(1)
//   })

//   process.on('uncaughtException', async (err) => {
//     logger.error(`Uncaught exception, message: ${err.message}`, err)
//     process.exit(1)
//   })

//   process.on('error', (e) => logger.error('Server error \n %o', e))
// }

// initServer()

const { port } = require('./config')
const logger = require('./loaders/logger')
const app = require('./loaders/express')
const { db } = require('./loaders/database')

db.connect()

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port}`))

module.exports = app
