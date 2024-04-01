import { testEnvironment, testConstants } from '../../../tests/helper'

xdescribe('route.spotPrice::api', () => {
  beforeAll(async () => {
    await testEnvironment.setupApiForTestEnvironment()
  })

  afterAll(async () => {
    await testEnvironment.teardownApiForTestEnvironment()
  })

  describe('GET /apitest', () => {
    it('GET /apitest should return 200', async () => {
      await testEnvironment.getApi()
        .get(`${testConstants.BASE_API_URL}/test`)
        .expect(200)
    })
  })
})
