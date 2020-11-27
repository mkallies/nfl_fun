const { Op } = require('sequelize')
const { models } = require('../../loaders/database')
const { Parser } = require('json2csv')

const PAGE_SIZE = 25

const rushingService = {
  getAllStats: async (query) => {
    const { name, sortBy, orderBy } = query

    const page = parseInt(query.page) || 0

    const offset = page * PAGE_SIZE

    let searchQuery = {
      limit: PAGE_SIZE,
      offset,
      raw: true,
    }

    if (name) {
      searchQuery = {
        ...searchQuery,
        where: {
          player: {
            [Op.iLike]: `%${name}%`,
          },
        },
      }
    }

    if (orderBy) {
      searchQuery = {
        ...searchQuery,
        order: [[sortBy, orderBy]],
      }
    }

    try {
      const stats = await models.Rushing.findAll(searchQuery)

      return { stats, hasMore: stats.length === 25 }
    } catch (error) {
      return error
    }
  },
  saveRushingData: async (data) => {
    try {
      if (!data) {
        throw new Error('Please supply data')
      }
      const massaged = data.map((item) => {
        return models.Rushing.mapToSchema(item)
      })
      await models.Rushing.bulkCreate(massaged)
    } catch (error) {
      console.log({ error })
      return error
    }
  },
  downloadData: async (query) => {
    const { name, sortBy, orderBy } = query

    let downloadQuery = {
      raw: true,
    }

    if (name) {
      downloadQuery = {
        ...downloadQuery,
        where: {
          player: {
            [Op.iLike]: `%${name}%`,
          },
        },
      }
    }

    if (orderBy) {
      downloadQuery = {
        ...downloadQuery,
        order: [[sortBy, orderBy]],
      }
    }

    try {
      const stats = await models.Rushing.findAll(downloadQuery)

      const csvParser = new Parser({
        fields: [
          {
            label: 'Player',
            value: 'player',
          },
          {
            label: 'Team',
            value: 'team',
          },
          {
            label: 'Pos',
            value: 'position',
          },
          {
            label: 'Att',
            value: 'attempts',
          },
          {
            label: 'Att/G',
            value: 'attempts_per_game',
          },
          {
            label: 'Yds',
            value: 'total_yards',
          },
          {
            label: 'Avg',
            value: 'avg_rush_per_attempt',
          },
          {
            label: 'TD',
            value: 'rushing_tds',
          },
          {
            label: 'Lng',
            value: 'longest_rush',
          },
          {
            label: '1st',
            value: 'rushing_first_down',
          },
          {
            label: '1st%',
            value: 'rushing_first_down_pct',
          },
          {
            label: '20+',
            value: 'rushing_20',
          },
          {
            label: '40+',
            value: 'rushing_40',
          },
          {
            label: 'FUM',
            value: 'fumbles',
          },
        ],
      })
      const csvData = csvParser.parse(stats)

      return csvData
    } catch (error) {
      return error
    }
  },
}

module.exports = rushingService
