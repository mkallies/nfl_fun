const express = require('express')
const rushingRoutes = require('../../features/rushing/rushing.routes')

const router = express.Router()

router.get('/health', (req, res) => res.json('OK'))

router.use('/rushing', rushingRoutes)

module.exports = router
