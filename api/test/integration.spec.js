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

  test('GET rushing - should return with `hasMore` and `stats` properties', async () => {
    const response = await request.get('/v1/rushing?page=0')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('hasMore')
    expect(response.body).toHaveProperty('stats')
    expect(response.body.stats).toHaveLength(25)
  })

  test('GET rushing - should return page 0 if no page query param', async () => {
    const response = await request.get('/v1/rushing')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('hasMore')
    expect(response.body).toHaveProperty('stats')
    expect(response.body.stats).toHaveLength(25)
  })

  test('GET rushing - should return 1 item with name query as `brett`', async () => {
    const response = await request.get('/v1/rushing?page=0&name=brett')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('hasMore')
    expect(response.body).toHaveProperty('stats')
    expect(response.body.stats).toHaveLength(1)
  })
})
