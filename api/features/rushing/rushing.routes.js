const { Router } = require('express')
const RushingController = require('./rushing.controller')

const router = Router()

router.get('/', RushingController.getStats)
router.post('/', RushingController.saveRushingData)

router.get('/download', RushingController.downloadStats)

module.exports = router
