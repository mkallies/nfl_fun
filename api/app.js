const { port } = require('./config')
const logger = require('./loaders/logger')
const app = require('./loaders/express')
const { db } = require('./loaders/database')

db.connect()

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port}`))

module.exports = app
