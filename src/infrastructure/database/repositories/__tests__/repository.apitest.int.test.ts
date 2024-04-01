import { testEnvironment } from '../../../../tests/helper'
import repositoryApitest from '../repository.apitest'

describe('repository.apitest::int', () => {
  beforeAll(async () => {
    await testEnvironment.setupDatabaseForTestEnvironment()
  })
  afterAll(async () => {
    await testEnvironment.teardownDatabaseForTestEnvironment()
  })
  describe('createApiTest', () => {
    it('should create a new record and return it', async () => {
      const res = await repositoryApitest.createApiTest([{ description: 'test', name: 'test' }])
      expect(res.length).toBe(1)
      expect(res[0]).toStrictEqual({
        description: 'test',
        name: 'test',
        uuid: expect.any(String),
        created_at: expect.any(Date),
        id: expect.any(Number)
      })
    })
  })
  describe('getApiTest', () => {
    beforeAll(async () => {
      await repositoryApitest.createApiTest([
        { description: 'test', name: 'test1' },
        { description: 'test', name: 'test2' },
        { description: 'test', name: 'test3' }
      ])
    })
    it('should return all records', async () => {
      const res = await repositoryApitest.getApiTest()
      expect(res.length).toBeGreaterThanOrEqual(3)
    })
    it('should return only one record', async () => {
      const all = await repositoryApitest.getApiTest()
      const res = await repositoryApitest.getApiTest([all[0].uuid])
      expect(res.length).toBe(1)
      expect(res[0].uuid).toBe(all[0].uuid)
    })
  })
})
