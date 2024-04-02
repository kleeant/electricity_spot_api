/* eslint-disable  @typescript-eslint/naming-convention */

import { testEnvironment, testConstants, mockdata } from '../../../tests/helper'
import { SpotPriceService } from '../service.spotPrice'
import { IDataSourceEntsoe } from '../../../infrastructure/interface/IDataSourceEntsoe'
import configDotenv from '../../../infrastructure/config/config.dotenv'
import databaseConnection from '../../../infrastructure/database/database.connection'

describe('route.spotPrice::api', () => {
  beforeAll(async () => {
    await testEnvironment.setupApiForTestEnvironment()
    const mockEntsoeData = mockdata.getEntsoePrice([
      { start: '2024-02-24T23:00Z', end: '2024-02-25T23:00Z' },
      { start: '2024-02-25T23:00Z', end: '2024-02-26T23:00Z' },
      { start: '2024-02-26T23:00Z', end: '2024-02-27T23:00Z' }
    ])
    const entsoeMock: IDataSourceEntsoe = {
      getDayAheadPrices: async (from, to) => {
        return mockEntsoeData
      }
    }
    await (new SpotPriceService(entsoeMock)).updatePrices()
  })

  afterAll(async () => {
    await testEnvironment.teardownApiForTestEnvironment()
  })

  describe('GET /spot_price', () => {
    const date_from = '2024-02-24T23:00:00.000Z'
    const date_to = '2024-02-26T23:00:00.000Z'
    it('should return 200', async () => {
      const result = await testEnvironment.getApi()
        .get(`${testConstants.BASE_API_URL}/spot_price`)
        .query({ date_from, date_to })
        .expect(200)
      expect(result.body.data.from).toBe(date_from)
      expect(result.body.data.to).toBe(date_to)
      expect(result.body.data.meta).toEqual({
        price_unit: 'c/kWh',
        tax: configDotenv.ELECTRICITY_TAX_FIN,
        highest_price_in_request_range: expect.any(String),
        lowest_price_in_request_range: expect.any(String)
      })
      expect(result.body.data.prices.length).not.toBe(0)
    })
    it('should return 400 if date_from is missing', async () => {
      await testEnvironment.getApi()
        .get(`${testConstants.BASE_API_URL}/spot_price`)
        .query({ date_to })
        .expect(400)
    })
    it('should return 400 if date_to is missing', async () => {
      await testEnvironment.getApi()
        .get(`${testConstants.BASE_API_URL}/spot_price`)
        .query({ date_from })
        .expect(400)
    })
    it('should return numbers rounded to 2 decimals', async () => {
      const result = await testEnvironment.getApi()
        .get(`${testConstants.BASE_API_URL}/spot_price`)
        .query({ date_from, date_to })
        .expect(200)
      const firstPrice = result.body.data.prices[0]
      expect(firstPrice.price).toBe('12.36')
      expect(firstPrice.price_with_tax).toBe('15.32')
    })
    describe('TSpotPriceSummaryMeta', () => {
      beforeAll(async () => {
        await databaseConnection.runQuery('DELETE FROM spot_price')
        testEnvironment.resetApi()
        const mockEntsoeData = mockdata.getEntsoePrice([
          { start: '2024-02-24T23:00Z', end: '2024-02-25T23:00Z' }
        ])
        mockEntsoeData.Publication_MarketDocument.TimeSeries[0].Period.Point[0]['price.amount'] = 456.78
        mockEntsoeData.Publication_MarketDocument.TimeSeries[0].Period.Point[1]['price.amount'] = 10.11
        const entsoeMock: IDataSourceEntsoe = {
          getDayAheadPrices: async (from, to) => {
            return mockEntsoeData
          }
        }
        await (new SpotPriceService(entsoeMock)).updatePrices()
      })
      it('should return the highest price in SpotPriceummary', async () => {
        const result = await testEnvironment.getApi()
          .get(`${testConstants.BASE_API_URL}/spot_price`)
          .query({ date_from, date_to })
          .expect(200)

        expect(result.body.data.meta.highest_price_in_request_range).toBe('45.68')
      })
      it('should return a boolean lowest_in_range for the lowest price', async () => {
        const result = await testEnvironment.getApi()
          .get(`${testConstants.BASE_API_URL}/spot_price`)
          .query({ date_from, date_to })
          .expect(200)

        expect(result.body.data.meta.lowest_price_in_request_range).toBe('1.01')
      })
    })
  })
})
