import { testEnvironment, testConstants } from '../../../tests/helper'

describe('route.apitest::api', () => {
  beforeAll(async () => {
    await testEnvironment.setupApiForTestEnvironment()
  })

  afterAll(async () => {
    await testEnvironment.teardownApiForTestEnvironment()
  })

  describe('POST /apitest', () => {
    it('should create a new record and return it', async () => {
      const response = await testEnvironment.getApi()
        .post(`${testConstants.BASE_API_URL}/test`)
        .send([{ description: 'test', name: 'test' }])
        .expect(200)
      expect(response.body.data).toHaveLength(1)
      expect(response.body.data[0]).toStrictEqual({
        description: 'test',
        name: 'test',
        uuid: expect.any(String),
        created_at: expect.any(String)
      })
    })
  })
  describe('GET /apitest', () => {
    it('GET /apitest should return 200', async () => {
      await testEnvironment.getApi()
        .get(`${testConstants.BASE_API_URL}/test`)
        .expect(200)
    })
  })
})
