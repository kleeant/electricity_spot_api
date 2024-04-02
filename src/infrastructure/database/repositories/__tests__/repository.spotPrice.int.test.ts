import { testEnvironment } from '../../../../tests/helper'
import databaseConnection from '../../database.connection'
import repositorySpotPrice from '../repository.spotPrice'
import { Decimal } from 'decimal.js'

describe('repository.spotPrice::int', () => {
  beforeAll(async () => {
    await testEnvironment.setupDatabaseForTestEnvironment()
  })
  afterAll(async () => {
    await testEnvironment.teardownDatabaseForTestEnvironment()
  })
  afterEach(async () => {
    await databaseConnection.runQuery('DELETE FROM spot_price')
  })
  describe('#createSpotPrices', () => {
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
    it('should throw an error if timestamp already exists', async () => {
      const data = { price: new Decimal('2.75'), timestamp: new Date() }
      await repositorySpotPrice.createSpotPrices([data])
      await expect(repositorySpotPrice.createSpotPrices([data])).rejects.toThrow(/duplicate key value violates unique constraint "spot_price_timestamp_uindex"/)
    })
  })

  describe('#getLatestTimeStamp', () => {
    it('should return the latest timestamp', async () => {
      const decimal = new Decimal('2.75')
      const data = [
        { price: decimal, timestamp: new Date('2024-02-24T21:00:00.000Z') },
        { price: decimal, timestamp: new Date('2024-02-24T22:00:00.000Z') },
        { price: decimal, timestamp: new Date('2024-02-24T23:00:00.000Z') }
      ]
      await repositorySpotPrice.createSpotPrices(data)
      const res = await repositorySpotPrice.getLatestTimeStamp()
      expect(res).toEqual({ timestamp: new Date('2024-02-24T23:00:00.000Z') })
    })
    it('should return null if no data', async () => {
      const res = await repositorySpotPrice.getLatestTimeStamp()
      expect(res).toBeNull()
    })
  })

  describe('#getSpotPrices', () => {
    it('should return all spot prices between two dates', async () => {
      const decimal = new Decimal('2.75')
      const data = [
        { price: decimal, timestamp: new Date('2024-02-24T21:00:00.000Z') },
        { price: decimal, timestamp: new Date('2024-02-24T22:00:00.000Z') },
        { price: decimal, timestamp: new Date('2024-02-24T23:00:00.000Z') }
      ]
      await repositorySpotPrice.createSpotPrices(data)
      const res = await repositorySpotPrice.getSpotPrices(new Date('2024-02-24T21:00:00.000Z'), new Date('2024-02-24T23:00:00.000Z'))
      expect(res.length).toBe(3)
    })
    it('should not return a record if it is outside the date range', async () => {
      const decimal = new Decimal('2.75')
      const data = [
        { price: decimal, timestamp: new Date('2024-02-24T21:00:00.000Z') },
        { price: decimal, timestamp: new Date('2024-02-24T22:00:00.000Z') },
        { price: decimal, timestamp: new Date('2024-02-24T23:00:00.000Z') }
      ]
      await repositorySpotPrice.createSpotPrices(data)
      const res = await repositorySpotPrice.getSpotPrices(new Date('2024-02-24T21:00:00.000Z'), new Date('2024-02-24T22:59:00.000Z'))
      expect(res.length).toBe(2)
      expect(res[0].timestamp).toEqual(new Date('2024-02-24T21:00:00.000Z'))
      expect(res[1].timestamp).toEqual(new Date('2024-02-24T22:00:00.000Z'))
    })
    it('should return prices in order of date', async () => {
      const decimal = new Decimal('2.75')
      const data = [
        { price: decimal, timestamp: new Date('2024-02-24T22:00:00.000Z') },
        { price: decimal, timestamp: new Date('2024-02-24T21:00:00.000Z') },
        { price: decimal, timestamp: new Date('2024-02-24T23:00:00.000Z') }
      ]
      await repositorySpotPrice.createSpotPrices(data)
      const res = await repositorySpotPrice.getSpotPrices(new Date('2024-02-24T21:00:00.000Z'), new Date('2024-02-24T23:00:00.000Z'))
      expect(res[0].timestamp).toEqual(new Date('2024-02-24T21:00:00.000Z'))
      expect(res[1].timestamp).toEqual(new Date('2024-02-24T22:00:00.000Z'))
      expect(res[2].timestamp).toEqual(new Date('2024-02-24T23:00:00.000Z'))
    })
  })
})
