const rushingService = require('./rushing.service')

const RushingController = {
  getStats: async (req, res) => {
    try {
      const stats = await rushingService.getAllStats(req.query)

      res.send(stats)
    } catch (error) {
      console.log(error)
      res.send({
        status: 500,
        error,
      })
    }
  },
  saveRushingData: async (req, res) => {
    try {
      await rushingService.saveRushingData(req.body)

      res.json('ok')
    } catch (error) {
      console.log({ error })
      res.send({
        status: 500,
        error,
      })
    }
  },
  downloadStats: async (req, res) => {
    try {
      const csv = await rushingService.downloadData(req.query)

      res.setHeader('Content-Type', 'text/csv')
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=rushing_stats.csv'
      )

      res.send(csv)
    } catch (error) {
      res.send({
        status: 500,
        error,
      })
    }
  },
}

module.exports = RushingController
