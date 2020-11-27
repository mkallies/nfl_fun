const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const routes_v1 = require('../routes/v1')
const error = require('../middleware/error')

const app = express()
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/v1', routes_v1)
app.use('/health', (req, res) => res.json('OK'))

app.use(error.handler)

module.exports = app
