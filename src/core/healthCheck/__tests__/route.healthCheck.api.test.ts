import { testConstants, testEnvironment } from '../../../tests/helper'
describe('route.healthCheck::api', () => {
  it('GET /healthcheck should return appropriate body with 200', async () => {
    const response = await testEnvironment.getApi()
      .get(`${testConstants.BASE_API_URL}/healthcheck`)
      .expect(200)
    expect(response.body).toStrictEqual(expect.objectContaining({
      status: 'OK',
      uptime: expect.any(Number),
      timestamp: expect.any(String),
      version: expect.any(String)
    }))
  })
})
