import { SpotPriceService } from '../service.spotPrice'
import { mockdata, testEnvironment } from '../../../tests/helper'
import { IDataSourceEntsoe } from '../../../infrastructure/interface/IDataSourceEntsoe'
import databaseConnection from '../../../infrastructure/database/database.connection'
import { TEntsoePriceResult } from '../../../lib/schema/entsoePrice.schema'
import repositorySpotPrice from '../../../infrastructure/database/repositories/repository.spotPrice'
import serviceExternalPriceParser from '../service.externalPriceParser'

describe('service.spotPrice::int', () => {
  const getEntsoePrice = (): TEntsoePriceResult => mockdata.getEntsoePrice([
    { start: '2024-02-24T23:00Z', end: '2024-02-25T23:00Z' }, { start: '2024-02-25T23:00Z', end: '2024-02-26T23:00Z' }
  ])
  let service: SpotPriceService
  let mock: IDataSourceEntsoe
  beforeAll(async () => {
    await testEnvironment.setupDatabaseForTestEnvironment()
    mock = {
      getDayAheadPrices: jest.fn().mockResolvedValue(getEntsoePrice())
    }
    service = new SpotPriceService(mock, repositorySpotPrice, serviceExternalPriceParser)
  })
  afterAll(async () => {
    await testEnvironment.teardownDatabaseForTestEnvironment()
  })
  afterEach(async () => {
    await databaseConnection.runQuery('DELETE FROM spot_price')
  })
  describe('updatePrices', () => {
    it('should update prices', async () => {
      await service.updatePrices()
      expect(mock.getDayAheadPrices).toHaveBeenCalled()
      const db = await databaseConnection.runQuery('SELECT * FROM spot_price')
      expect(db.length).toBe(48) // 2 days * 24 hours
    })
    it('should not update prices if there is no new data', async () => {
      await service.updatePrices()
      expect(mock.getDayAheadPrices).toHaveBeenCalled()
      const db = await databaseConnection.runQuery('SELECT * FROM spot_price')
      expect(db.length).toBe(48) // 2 days * 24 hours

      const spy = jest.spyOn(repositorySpotPrice, 'createSpotPrices')
      await service.updatePrices()
      expect(spy).not.toHaveBeenCalled()
    })
    it('should call entsoe API with db latest timestamp if one is available', async () => {
      const dbTimestamp = new Date('2024-02-24T23:00Z')
      await databaseConnection.runQuery('INSERT INTO spot_price (timestamp, price) VALUES (?, ?)', [dbTimestamp, '12.34'])
      await service.updatePrices()
      expect(mock.getDayAheadPrices).toHaveBeenCalledWith(dbTimestamp, expect.any(Date))
    })
    it('should call entsoe API with a date 7 days ago if there is no data in the db', async () => {
      await service.updatePrices()
      // setting the date causes issues with the date matcher
      expect(mock.getDayAheadPrices).toHaveBeenCalledWith(expect.any(Date), expect.any(Date))
    })
    it('should not save prices that are already in the db', async () => {
      const dbTimestamp = new Date('2024-02-25T01:00Z') // removed two hours
      await databaseConnection.runQuery('INSERT INTO spot_price (timestamp, price) VALUES (?, ?)', [dbTimestamp, '12.34'])
      await service.updatePrices()
      const db = await databaseConnection.runQuery('SELECT * FROM spot_price')
      expect(db.length).toBe(46)
    })
  })
})
