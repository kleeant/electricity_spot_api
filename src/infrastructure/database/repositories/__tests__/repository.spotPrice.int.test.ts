import { testEnvironment } from '../../../../tests/helper'
import repositorySpotPrice from '../repository.spotPrice'
import { Decimal } from 'decimal.js'

describe('repository.spotPrice::int', () => {
  beforeAll(async () => {
    await testEnvironment.setupDatabaseForTestEnvironment()
  })
  afterAll(async () => {
    await testEnvironment.teardownDatabaseForTestEnvironment()
  })
  describe('createApiTest', () => {
    it('should create a new record and return it', async () => {
      const data = { price: new Decimal('2.75'), timestamp: new Date() }
      const res = await repositorySpotPrice.createSpotPrices([data])
      expect(res.length).toBe(1)
      expect(res[0]).toEqual({
        created_timestamp: expect.any(Date),
        timestamp: data.timestamp,
        price: data.price,
        id: expect.any(Number)
      })
    })
  })
})
