const app = require('../app')
// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest')

const request = supertest(app)

describe('Integration Tests', function () {
  test('/health - responds with OK', async () => {
    const response = await request.get('/health')

    expect(response.status).toBe(200)
    expect(response.body).toBe('OK')
  })

  test('should return with `hasMore` and `stats` properties', async () => {
    const response = await request.get('/v1/rushing?page=0')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('hasMore')
    expect(response.body).toHaveProperty('stats')
    expect(response.body.stats).toHaveLength(25)
  })

  test('should return page 0 if no page query param', async () => {
    const response = await request.get('/v1/rushing')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('hasMore')
    expect(response.body).toHaveProperty('stats')
    expect(response.body.stats).toHaveLength(25)
  })

  test('should return 1 item with name query as `brett`', async () => {
    const response = await request.get('/v1/rushing?page=0&name=brett')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('hasMore')
    expect(response.body).toHaveProperty('stats')
    expect(response.body.stats).toHaveLength(1)
    expect(response.body.stats[0].player).toMatch(/brett/i)
  })

  test('should return total rushing yards ASC', async () => {
    const response = await request.get(
      '/v1/rushing?page=0&sortBy=total_yards&orderBy=ASC'
    )

    expect(response.status).toBe(200)

    response.body.stats.forEach((stat, idx) => {
      const { total_yards } = stat

      const next = response.body.stats[idx + 1]

      if (next) {
        const { total_yards: nextTotalYards } = next

        expect(total_yards).toBeLessThanOrEqual(nextTotalYards)
      }
    })
  })

  test('should return total rushing yards DESC', async () => {
    const response = await request.get(
      '/v1/rushing?page=0&sortBy=total_yards&orderBy=DESC'
    )

    expect(response.status).toBe(200)
    response.body.stats.forEach((stat, idx) => {
      const { total_yards } = stat

      const next = response.body.stats[idx + 1]

      if (next) {
        const { total_yards: nextTotalYards } = next

        expect(total_yards).toBeGreaterThanOrEqual(nextTotalYards)
      }
    })
  })

  test('should return longest rushing yards ASC', async () => {
    const response = await request.get(
      '/v1/rushing?page=0&sortBy=longest_rush&orderBy=ASC'
    )

    expect(response.status).toBe(200)
    response.body.stats.forEach((stat, idx) => {
      const { longest_rush } = stat

      const next = response.body.stats[idx + 1]

      if (next) {
        const { longest_rush: nextLongestRush } = next

        expect(longest_rush).toBeLessThanOrEqual(nextLongestRush)
      }
    })
  })

  test('should return longest rushing yards DESC', async () => {
    const response = await request.get(
      '/v1/rushing?page=0&sortBy=longest_rush&orderBy=DESC'
    )

    expect(response.status).toBe(200)
    response.body.stats.forEach((stat, idx) => {
      const { longest_rush } = stat

      const next = response.body.stats[idx + 1]

      if (next) {
        const { longest_rush: nextLongestRush } = next

        expect(longest_rush).toBeGreaterThanOrEqual(nextLongestRush)
      }
    })
  })

  test('should return total rushing touchdowns ASC', async () => {
    const response = await request.get(
      '/v1/rushing?page=0&sortBy=rushing_tds&orderBy=ASC'
    )

    expect(response.status).toBe(200)

    response.body.stats.forEach((stat, idx) => {
      const { rushing_tds } = stat

      const next = response.body.stats[idx + 1]

      if (next) {
        const { rushing_tds: nextRushingTDs } = next

        console.log(rushing_tds, nextRushingTDs)

        expect(rushing_tds).toBeLessThanOrEqual(nextRushingTDs)
      }
    })
  })

  test('should return total rushing touchdowns DESC', async () => {
    const response = await request.get(
      '/v1/rushing?page=0&sortBy=rushing_tds&orderBy=DESC'
    )

    expect(response.status).toBe(200)
    response.body.stats.forEach((stat, idx) => {
      const { rushing_tds } = stat

      const next = response.body.stats[idx + 1]

      if (next) {
        const { rushing_tds: nextRushingTDs } = next

        expect(rushing_tds).toBeGreaterThanOrEqual(nextRushingTDs)
      }
    })
  })
})
